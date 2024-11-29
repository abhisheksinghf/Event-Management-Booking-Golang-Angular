package handlers

import (
	"encoding/json"
	"net/http"
	"backend/database"
	"backend/models"
	"golang.org/x/crypto/bcrypt"
)
func Login(w http.ResponseWriter, r *http.Request) {
	var credentials models.User
	err := json.NewDecoder(r.Body).Decode(&credentials)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	db := database.Connect()
	defer db.Close()

	var storedUser models.User
	query := "SELECT user_id, email, password, role FROM users WHERE email = ?"
	err = db.QueryRow(query, credentials.Email).Scan(&storedUser.UserID, &storedUser.Email, &storedUser.Password, &storedUser.Role)
	if err != nil {
		http.Error(w, "User not found", http.StatusUnauthorized)
		return
	}

	
	err = bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(credentials.Password))
	if err != nil {
		http.Error(w, "Invalid password", http.StatusUnauthorized)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"message": "Login successful",
		"user_id": storedUser.UserID,
		"role":    storedUser.Role,
	})
}
