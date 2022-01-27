package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID `bson:"_id"`
	Name      string             `json:"name"`
	Surname   string             `json:"surname"`
	Email     string             `json:"email"`
	Password  string             `json:"password"`
	IsAdmin   bool               `json:"isAdmin"`
	CreatedAt time.Time          `json:"createdAt"`
	Token     string             `json:"token"`
	Todo      []Todo             `json:"todo"`
}
