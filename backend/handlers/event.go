package handlers

import (
    "encoding/json"
    "net/http"
    "backend/database"
    "backend/models"
    "log"
)

func AddEvent(w http.ResponseWriter, r *http.Request) {
    log.Println("Received request to add a new event")
    
    var event models.Event
    err := json.NewDecoder(r.Body).Decode(&event)
    if err != nil {
        log.Println("Error decoding request body:", err)
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    log.Printf("Parsed event: %+v\n", event)

    if event.OrganizerID == 0 {
        log.Println("Organizer ID is missing or invalid")
        http.Error(w, "Organizer ID is missing or invalid", http.StatusBadRequest)
        return
    }

    db := database.Connect()
    defer db.Close()

    query := `INSERT INTO events(title, description, location, date, time, category, ticket_price, total_tickets, available_tickets, organizer_id) 
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    _, err = db.Exec(query, event.Title, event.Description, event.Location, event.Date, event.Time, event.Category, 
                     event.TicketPrice, event.TotalTickets, event.TotalTickets, event.OrganizerID)
    if err != nil {
        log.Println("Error adding event:", err)
        http.Error(w, "Error adding event", http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]interface{}{"message": "Event added successfully"})
}

func GetEvents(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")  
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE") 
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	db := database.Connect()
	defer db.Close()

	rows, err := db.Query("SELECT event_id, title, description, location, date, time, category, ticket_price, total_tickets, available_tickets, organizer_id FROM events")
	if err != nil {
		log.Println("Error fetching events:", err)
		http.Error(w, "Error fetching events", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var events []models.Event
	for rows.Next() {
		var event models.Event
		err := rows.Scan(&event.EventID, &event.Title, &event.Description, &event.Location, &event.Date, &event.Time, &event.Category, &event.TicketPrice, &event.TotalTickets, &event.AvailableTickets, &event.OrganizerID)
		if err != nil {
			log.Println("Error scanning event:", err)
			http.Error(w, "Error scanning event", http.StatusInternalServerError)
			return
		}
		events = append(events, event)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(events)
}
func BookTicket(w http.ResponseWriter, r *http.Request) {
    
    var registration struct {
        EventID    int     `json:"event_id"`
        Name       string  `json:"name"`
        TotalPrice float64 `json:"total_price"`
    }

    err := json.NewDecoder(r.Body).Decode(&registration)
    if err != nil {
        log.Println("Error decoding registration data:", err)
        http.Error(w, "Invalid registration data", http.StatusBadRequest)
        return
    }

    db := database.Connect()
    defer db.Close()

    tx, err := db.Begin()
    if err != nil {
        log.Println("Error starting transaction:", err)
        http.Error(w, "Could not process registration", http.StatusInternalServerError)
        return
    }

    _, err = tx.Exec(`
        INSERT INTO event_tickets (event_id, name, total_price) 
        VALUES (?, ?, ?)`, registration.EventID, registration.Name, registration.TotalPrice)
    if err != nil {
        log.Println("Error inserting registration:", err)
        tx.Rollback()
        http.Error(w, "Could not register ticket", http.StatusInternalServerError)
        return
    }

    result, err := tx.Exec(`
        UPDATE events 
        SET available_tickets = available_tickets - 1 
        WHERE event_id = ? AND available_tickets > 0`, registration.EventID)
    if err != nil {
        log.Println("Error updating available tickets:", err)
        tx.Rollback()
        http.Error(w, "Could not update ticket availability", http.StatusInternalServerError)
        return
    }

    rowsAffected, _ := result.RowsAffected()
    if rowsAffected == 0 {
        log.Println("No tickets available or invalid event_id")
        tx.Rollback()
        http.Error(w, "Tickets sold out or invalid event ID", http.StatusBadRequest)
        return
    }

    err = tx.Commit()
    if err != nil {
        log.Println("Error committing transaction:", err)
        http.Error(w, "Could not finalize registration", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{
        "message": "Registration successful",
    })
}

func GetEventsByOrganizer(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	organizerID := r.URL.Query().Get("orgId")
	if organizerID == "" {
		http.Error(w, "Missing orgId query parameter", http.StatusBadRequest)
		return
	}

	db := database.Connect()
	defer db.Close()

	rows, err := db.Query(`
		SELECT event_id, title, description, location, date, time, category, ticket_price, total_tickets, available_tickets, organizer_id
		FROM events
		WHERE organizer_id = ?`, organizerID)

	if err != nil {
		log.Println("Error fetching events:", err)
		http.Error(w, "Error fetching events", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var events []models.Event
	for rows.Next() {
		var event models.Event
		if err := rows.Scan(&event.EventID, &event.Title, &event.Description, &event.Location, &event.Date, &event.Time, &event.Category, &event.TicketPrice, &event.TotalTickets, &event.AvailableTickets, &event.OrganizerID); err != nil {
			log.Println("Error scanning event:", err)
			http.Error(w, "Error scanning event", http.StatusInternalServerError)
			return
		}
		events = append(events, event)
	}

	if len(events) == 0 {
		events = []models.Event{}
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(events); err != nil {
		log.Println("Error encoding events:", err)
		http.Error(w, "Error encoding events", http.StatusInternalServerError)
	}
}

func GetBookings(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	organizerID := r.URL.Query().Get("orgId")
	if organizerID == "" {
		http.Error(w, "Missing orgId query parameter", http.StatusBadRequest)
		return
	}

	db := database.Connect()
	defer db.Close()

	rows, err := db.Query(`
		SELECT 
			e.event_id, 
			e.title, 
			e.location, 
			e.date, 
			e.time, 
			et.ticket_id, 
			et.name AS ticket_name, 
			et.total_price
		FROM 
			events e
		JOIN 
			event_tickets et ON e.event_id = et.event_id
		WHERE 
			e.organizer_id = ?`, organizerID)

	if err != nil {
		log.Println("Error fetching events and tickets:", err)
		http.Error(w, "Error fetching events and tickets", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var bookings []models.EventWithTickets

	for rows.Next() {
		var booking models.EventWithTickets
		if err := rows.Scan(&booking.EventID, &booking.Title, &booking.Location, &booking.Date, &booking.Time, &booking.TicketID, &booking.TicketName, &booking.TotalPrice); err != nil {
			log.Println("Error scanning event and ticket:", err)
			http.Error(w, "Error scanning event and ticket", http.StatusInternalServerError)
			return
		}
		bookings = append(bookings, booking)
	}

	if len(bookings) == 0 {
		bookings = []models.EventWithTickets{}
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(bookings); err != nil {
		log.Println("Error encoding bookings:", err)
		http.Error(w, "Error encoding bookings", http.StatusInternalServerError)
	}
}

func DeleteEvent(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

	eventID := r.URL.Query().Get("eventId")
	if eventID == "" {
		http.Error(w, "Missing eventId query parameter", http.StatusBadRequest)
		return
	}

	db := database.Connect()
	defer db.Close()

	_, err := db.Exec("DELETE FROM events WHERE event_id = ?", eventID)
	if err != nil {
		log.Println("Error deleting event:", err)
		http.Error(w, "Error deleting event", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Event deleted successfully"))
}



func GetAllBookings(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		w.WriteHeader(http.StatusOK)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")


	db := database.Connect()
	defer db.Close()

	rows, err := db.Query(`
		SELECT 
			e.event_id, 
			e.title, 
			e.location, 
			e.date, 
			e.time, 
			et.ticket_id, 
			et.name AS ticket_name, 
			et.total_price
		FROM 
			events e
		JOIN 
			event_tickets et ON e.event_id = et.event_id
		`)

	if err != nil {
		log.Println("Error fetching events and tickets:", err)
		http.Error(w, "Error fetching events and tickets", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var bookings []models.EventWithTickets

	for rows.Next() {
		var booking models.EventWithTickets
		if err := rows.Scan(&booking.EventID, &booking.Title, &booking.Location, &booking.Date, &booking.Time, &booking.TicketID, &booking.TicketName, &booking.TotalPrice); err != nil {
			log.Println("Error scanning event and ticket:", err)
			http.Error(w, "Error scanning event and ticket", http.StatusInternalServerError)
			return
		}
		bookings = append(bookings, booking)
	}

	if len(bookings) == 0 {
		bookings = []models.EventWithTickets{}
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(bookings); err != nil {
		log.Println("Error encoding bookings:", err)
		http.Error(w, "Error encoding bookings", http.StatusInternalServerError)
	}
}