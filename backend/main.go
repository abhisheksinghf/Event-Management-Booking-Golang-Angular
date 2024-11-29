package main

import (
	"log"
	"net/http"

	"github.com/rs/cors" 
	"backend/database"
	"backend/handlers"
)

func main() {
	db := database.Connect()
	defer db.Close()

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200"}, 
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	http.Handle("/register", corsHandler.Handler(http.HandlerFunc(handlers.Register)))
	http.Handle("/login", corsHandler.Handler(http.HandlerFunc(handlers.Login))) 
	http.Handle("/addEvent", corsHandler.Handler(http.HandlerFunc(handlers.AddEvent))) 
	http.Handle("/bookticket", corsHandler.Handler(http.HandlerFunc(handlers.BookTicket))) 
	http.HandleFunc("/getevents", handlers.GetEvents)
	http.HandleFunc("/geteventsbyorgid", handlers.GetEventsByOrganizer)
	http.HandleFunc("/getbookings", handlers.GetBookings)
	http.HandleFunc("/deleteevent", handlers.DeleteEvent)
	http.HandleFunc("/getallbookings", handlers.GetAllBookings)

	
	log.Println("Server starting on port 8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Error starting the server: ", err)
	}
}
