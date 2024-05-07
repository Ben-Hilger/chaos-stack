package app

import (
	"github.com/Ben-Hilger/api-go/api"
	"github.com/Ben-Hilger/api-go/database"
)

type App struct {
	ApiHandler api.ApiHandler
}

func NewApp() App {
	db, err := database.NewTursoDBClient()
	if err != nil {
		panic(err.Error())
	}
	apiHandler := api.NewApiHandler(db)

	return App{ApiHandler: apiHandler}
}
