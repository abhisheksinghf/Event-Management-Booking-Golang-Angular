package main

import (
	"log"
	"net/http"

	"github.com/rs/cors" // CORS package
	"backend/database"
	"backend/handlers"
)

func main() {
	// Connect to the database
	db := database.Connect()
	defer db.Close()

	// Create a new CORS handler
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200"}, // Allow frontend origin
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Configure routes
	http.Handle("/register", corsHandler.Handler(http.HandlerFunc(handlers.Register)))
	http.Handle("/login", corsHandler.Handler(http.HandlerFunc(handlers.Login))) // Add login handler
	http.Handle("/addEvent", corsHandler.Handler(http.HandlerFunc(handlers.AddEvent))) // Add event handler
	http.Handle("/bookticket", corsHandler.Handler(http.HandlerFunc(handlers.BookTicket))) // Add event handler
	http.HandleFunc("/getevents", handlers.GetEvents)
	http.HandleFunc("/geteventsbyorgid", handlers.GetEventsByOrganizer)
	http.HandleFunc("/getbookings", handlers.GetBookings)
	http.HandleFunc("/deleteevent", handlers.DeleteEvent)

	// Start the server
	log.Println("Server starting on port 8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Error starting the server: ", err)
	}
}
