package api

import (
	"encoding/json"
	"fmt"
	"github.com/Ben-Hilger/api-go/database"
	"net/http"
	"strconv"
)

type ApiHandler struct {
	dbStore database.Database
}

func NewApiHandler(dbStore database.Database) ApiHandler {
	return ApiHandler{
		dbStore: dbStore,
	}
}

func sendJsonResponse(writer http.ResponseWriter, statusCode int, message interface{}) {
	writer.WriteHeader(statusCode)
	type Message struct {
		Data interface{} `json:"data"`
	}

	err := json.NewEncoder(writer).Encode(Message{Data: message})
	if err != nil {
		fmt.Println("unable to encode json response", err)
	}

}

func (a ApiHandler) RegisterApiRoutes(mux *http.ServeMux) {
	mux.HandleFunc("/go/api/user", a.handleUserRoute)
	mux.HandleFunc("/go/api/entry", a.handlerEntryRoute)
}

func (a ApiHandler) handlerEntryRoute(response http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodPost:
		a.handleAddEntryRoute(response, request)
		return
	case http.MethodGet:
		a.handleGetAllEntriesRoute(response, request)
		return
	default:
		http.Error(response, "method not allowed", http.StatusMethodNotAllowed)
	}
}

func (a ApiHandler) handleUserRoute(response http.ResponseWriter, request *http.Request) {
	switch request.Method {
	case http.MethodPost:
		a.handleAddUserIdRoute(response, request)
		return
	case http.MethodPut:
		a.handleUserIdValidationRoute(response, request)
		return
	default:
		http.Error(response, "method not allowed", http.StatusMethodNotAllowed)

	}
}

func (a ApiHandler) handleAddUserIdRoute(response http.ResponseWriter, request *http.Request) {
	user, err := a.dbStore.CreateNewUser()
	if err != nil {
		fmt.Println("unable to create a new userId", err)
		sendJsonResponse(response, 500, "internal server error")
	}
	sendJsonResponse(response, 200, user)
}
func (a ApiHandler) handleUserIdValidationRoute(response http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodPut {
		http.Error(response, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	userId := request.URL.Query().Get("userId")

	if userId == "" {
		sendJsonResponse(response, 400, "userId is required")
		return
	}

	userExists := a.dbStore.DoesUserExist(userId)
	if !userExists {
		sendJsonResponse(response, 400, "userId is not valid")
		return
	}

	sendJsonResponse(response, 200, "userId is valid")
}

func (a ApiHandler) handleAddEntryRoute(response http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodPost {
		http.Error(response, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	userId := request.URL.Query().Get("userId")
	name := request.URL.Query().Get("name")
	amount, err := strconv.ParseFloat(request.URL.Query().Get("amount"), 64)
	if err != nil {
		sendJsonResponse(response, 400, "a valid amount is required")
	}

	if userId == "" || name == "" || amount == 0 {
		sendJsonResponse(response, 400, "userId, name and amount are required")
		return
	}

	userExists := a.dbStore.DoesUserExist(userId)
	if !userExists {
		sendJsonResponse(response, 400, "userId is not valid")
		return
	}

	err = a.dbStore.AddEntry(name, userId, amount)
	if err != nil {
		sendJsonResponse(response, 500, "unable to add a new entry")
		return
	}

	sendJsonResponse(response, 200, "successfully added entry")
}

func (a ApiHandler) handleGetAllEntriesRoute(response http.ResponseWriter, request *http.Request) {
	if request.Method != http.MethodGet {
		http.Error(response, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	userId := request.URL.Query().Get("userId")
	response.Header().Set("Content-Type", "application/json")

	if userId == "" {
		sendJsonResponse(response, 400, "userId is required")
		return
	}

	entries, err := a.dbStore.GetAllEntries(userId)
	if err != nil {
		fmt.Println("unable to get entries", err)
		sendJsonResponse(response, 500, "internal server error")
		return
	}

	sendJsonResponse(response, 200, entries)
}
