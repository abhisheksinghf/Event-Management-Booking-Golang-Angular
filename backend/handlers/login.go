package handlers

import (
	"encoding/json"
	"net/http"
	"backend/database"
	"backend/models"
	"golang.org/x/crypto/bcrypt"
)

// Login function handles user authentication
func Login(w http.ResponseWriter, r *http.Request) {
	// Parse the JSON body
	var credentials models.User
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Open the database connection
	db := database.Connect()
	defer db.Close()

	// Check if the user exists
	var storedUser models.User
	query := "SELECT user_id, email, password, role FROM users WHERE email = ?"
	err = db.QueryRow(query, credentials.Email).Scan(&storedUser.UserID, &storedUser.Email, &storedUser.Password, &storedUser.Role)
	if err != nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	// Compare the hashed passwords
	err = bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(credentials.Password))
	if err != nil {
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}

	// Return user_id and role
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Login successful",
		"user_id": storedUser.UserID,
		"role":    storedUser.Role,
	})
}
