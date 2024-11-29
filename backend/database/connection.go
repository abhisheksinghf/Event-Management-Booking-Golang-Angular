package database

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func Connect() *sql.DB {
	dsn := "root:@tcp(localhost:3306)/algomox-event-mgmt" 
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
