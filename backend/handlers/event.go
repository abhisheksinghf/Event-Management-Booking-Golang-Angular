package handlers

import (
    "encoding/json"
    "net/http"
    "backend/database"
    "backend/models"
    "log"
)

// AddEvent handles the logic for adding a new event.
func AddEvent(w http.ResponseWriter, r *http.Request) {
    log.Println("Received request to add a new event")
    
    // Parse the JSON body
    var event models.Event
    err := json.NewDecoder(r.Body).Decode(&event)
    if err != nil {
        log.Println("Error decoding request body:", err)
        http.Error(w, "Invalid request payload", http.StatusBadRequest)
        return
    }

    // Log the parsed event for debugging
    log.Printf("Parsed event: %+v\n", event)

    // Ensure the organizer_id is valid (non-zero)
    if event.OrganizerID == 0 {
        log.Println("Organizer ID is missing or invalid")
        http.Error(w, "Organizer ID is missing or invalid", http.StatusBadRequest)
        return
    }

    // Open the database connection
    db := database.Connect()
    defer db.Close()

    // Add new event
    query := `INSERT INTO events(title, description, location, date, time, category, ticket_price, total_tickets, available_tickets, organizer_id) 
              VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    _, err = db.Exec(query, event.Title, event.Description, event.Location, event.Date, event.Time, event.Category, 
                     event.TicketPrice, event.TotalTickets, event.TotalTickets, event.OrganizerID)
    if err != nil {
        log.Println("Error adding event:", err)
        http.Error(w, "Error adding event", http.StatusInternalServerError)
        return
    }

    // Successfully added the event
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]interface{}{"message": "Event added successfully"})
}

/// GetEvents handles the logic for fetching all events
func GetEvents(w http.ResponseWriter, r *http.Request) {
	// Set CORS headers to allow requests from the Angular app running on localhost:4200
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")  // Allow requests from the Angular frontend
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE") // Allow the necessary HTTP methods
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization") // Allow headers like Content-Type and Authorization

	// Open the database connection
	db := database.Connect()
	defer db.Close()

	// Query to fetch all events
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

	// Send the events as JSON response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(events)
}
func BookTicket(w http.ResponseWriter, r *http.Request) {
    // Parse the request body
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

    // Open the database connection
    db := database.Connect()
    defer db.Close()

    // Start a transaction
    tx, err := db.Begin()
    if err != nil {
        log.Println("Error starting transaction:", err)
        http.Error(w, "Could not process registration", http.StatusInternalServerError)
        return
    }

    // Insert the ticket registration
    _, err = tx.Exec(`
        INSERT INTO event_tickets (event_id, name, total_price) 
        VALUES (?, ?, ?)`, registration.EventID, registration.Name, registration.TotalPrice)
    if err != nil {
        log.Println("Error inserting registration:", err)
        tx.Rollback()
        http.Error(w, "Could not register ticket", http.StatusInternalServerError)
        return
    }

    // Decrement the available_tickets count
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

    // Commit the transaction
    err = tx.Commit()
    if err != nil {
        log.Println("Error committing transaction:", err)
        http.Error(w, "Could not finalize registration", http.StatusInternalServerError)
        return
    }

    // Respond with success in JSON format
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(map[string]string{
        "message": "Registration successful",
    })
}
