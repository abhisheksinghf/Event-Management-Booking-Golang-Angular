package handlers

import (
	"encoding/json"
	"net/http"
	"backend/database"
	"backend/models"
	"golang.org/x/crypto/bcrypt"
)

// Register function handles the user registration
func Register(w http.ResponseWriter, r *http.Request) {
	// Parse the JSON body
	
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Hash the password before storing it
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	// Open the database connection
	db := database.Connect()
	defer db.Close()

	// Prepare the SQL statement to insert the user into the database
	query := "INSERT INTO users (email, password, role) VALUES (?, ?, ?)"
	_, err = db.Exec(query, user.Email, hashedPassword, user.Role)
	if err != nil {
		http.Error(w, "Error inserting user into the database", http.StatusInternalServerError)
		return
	}

	// Respond with a success message
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "User registered successfully",
	})
}
