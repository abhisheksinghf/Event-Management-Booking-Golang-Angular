package models

type EventWithTickets struct {
	EventID    int     `json:"event_id"`
	Title      string  `json:"title"`
	Location   string  `json:"location"`
	Date       string  `json:"date"`
	Time       string  `json:"time"`
	TicketID   int     `json:"ticket_id"`
	TicketName string  `json:"ticket_name"`
	TotalPrice float64 `json:"total_price"`
}
