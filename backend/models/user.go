package models

// User struct to represent the users table in the database
type User struct {
	UserID   int    `json:"user_id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}
