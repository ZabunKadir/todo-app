package models

type TodoRequestBody struct {
	UserId     string `json:"userId"`
	TodoId     string `json:"todoId"`
	Token      string `json:"token"`
	Context    string `json:"context"`
	ActionType string `json:"actionType"`
}
