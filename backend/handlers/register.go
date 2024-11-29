package handlers

import (
	"encoding/json"
	"net/http"
	"backend/database"
	"backend/models"
	"golang.org/x/crypto/bcrypt"
)

func Register(w http.ResponseWriter, r *http.Request) {
	
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	db := database.Connect()
	defer db.Close()

	query := "INSERT INTO users (email, password, role) VALUES (?, ?, ?)"
	_, err = db.Exec(query, user.Email, hashedPassword, user.Role)
	if err != nil {
		http.Error(w, "Error inserting user into the database", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "User registered successfully",
	})
}
