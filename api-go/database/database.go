package database

import (
	"database/sql"
	"fmt"
	"github.com/Ben-Hilger/api-go/types"
	"github.com/google/uuid"
	_ "github.com/tursodatabase/libsql-client-go/libsql"
	"os"
)

type Database interface {
	DoesUserExist(userId string) bool
	CreateNewUser() (types.User, error)
	AddEntry(name string, userId string, amount float64) error
	GetAllEntries(userId string) ([]types.Entry, error)
}

type TursoDBClient struct {
	database *sql.DB
}

func NewTursoDBClient() (*TursoDBClient, error) {
	authToken := os.Getenv("TURSO_AUTH_TOKEN")
	dbUrl := os.Getenv("TURSO_DATABASE_URL")
	fullUrl := fmt.Sprintf("%s?authToken=%s", dbUrl, authToken)
	db, err := sql.Open("libsql", fullUrl)
	if err != nil {
		return nil, err
	}
	return &TursoDBClient{database: db}, nil
}

func (t TursoDBClient) AddEntry(name, userId string, amount float64) error {
	_, err := t.database.Query("INSERT INTO entries (name, user_id, amount) VALUES (?, ?, ?)", name, userId, amount)
	return err
}

func (t TursoDBClient) GetAllEntries(userId string) ([]types.Entry, error) {
	rows, err := t.database.Query("SELECT name, amount FROM entries WHERE user_id = ?", userId)

	var entries []types.Entry

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	for rows.Next() {
		var entry types.Entry

		if err := rows.Scan(&entry.Name, &entry.Amount); err != nil {
			fmt.Println("error scanning row", err)
			return nil, err
		}

		entries = append(entries, entry)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("error during rows iteration:", err)
		return nil, err
	}

	return entries, nil
}

func (t TursoDBClient) CreateNewUser() (types.User, error) {
	uuid, err := uuid.NewUUID()
	if err != nil {
		return types.User{}, err
	}
	return types.User{ID: uuid.String()}, nil
}

func (t TursoDBClient) DoesUserExist(userId string) bool {
	rows, err := t.database.Query("SELECT * FROM users WHERE id = ?", userId)
	if err != nil {
		fmt.Println("unable to check if a user exists", err)
		return false
	}
	defer rows.Close()

	for rows.Next() {
		var user types.User

		if err := rows.Scan(&user.ID); err != nil {
			fmt.Println("error scanning row", err)
			return false
		}

		if user.ID == userId {
			return true
		}
	}

	if err := rows.Err(); err != nil {
		fmt.Println("error during rows iteration:", err)
	}
	return false
}
