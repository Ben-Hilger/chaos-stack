package types

type User struct {
	ID string `json:"uuid"`
}

type Entry struct {
	Name   string  `json:"name"`
	Amount float64 `json:"amount"`
}
