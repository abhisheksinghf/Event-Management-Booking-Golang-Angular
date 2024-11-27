package models

// Event struct to represent the events table in the database
type Event struct {
    EventID      int    `json:"event_id"`      // Primary key for the event (auto-incremented by database)
    Title        string `json:"title"`         // The title of the event
    Description  string `json:"description"`   // The description of the event
    Location     string `json:"location"`      // The location where the event will take place
    Date         string `json:"date"`          // The date of the event (in "YYYY-MM-DD" format)
    Time         string `json:"time"`          // The time of the event (in "HH:mm" format)
    Category     string `json:"category"`      // The category of the event (e.g., Music, Tech, etc.)
    TicketPrice  float64 `json:"ticket_price"` // The price of the tickets
    TotalTickets int    `json:"total_tickets"` // The total number of tickets available for the event
    AvailableTickets int `json:"available_tickets"` // The number of tickets still available for sale
    OrganizerID  int    `json:"organizer_id"`  // The ID of the organizer (foreign key)
}
