package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql" // MySQL driver
)

// Connect function to open a connection to the MySQL database.
func Connect() *sql.DB {
	// Use your own database credentials here
	dsn := "root:@tcp(localhost:3306)/algomox-event-mgmt" // Change the DSN accordingly
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
	if err := db.Ping(); err != nil {
		log.Fatal("Database not reachable: ", err)
	}
	fmt.Println("Connected to the database")
	return db
}
