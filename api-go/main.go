package main

import (
	"fmt"
	"github.com/Ben-Hilger/api-go/app"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
	"log"
	"net/http"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf(fmt.Sprintf("Unable to load .env file %s", err.Error()))
	}

	mux := http.NewServeMux()

	myApp := app.NewApp()
	myApp.ApiHandler.RegisterApiRoutes(mux)

	handler := cors.AllowAll().Handler(mux)

	log.Fatal(http.ListenAndServe(":8080", handler))
}
