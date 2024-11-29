package models

type Event struct {
    EventID      int    `json:"event_id"`      
    Title        string `json:"title"`         
    Description  string `json:"description"`   
    Location     string `json:"location"`     
    Date         string `json:"date"`           
    Time         string `json:"time"`           
    Category     string `json:"category"`       
    TicketPrice  float64 `json:"ticket_price"` 
    TotalTickets int    `json:"total_tickets"` 
    AvailableTickets int `json:"available_tickets"`
    OrganizerID  int    `json:"organizer_id"` 
}
