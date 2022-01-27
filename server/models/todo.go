package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Todo struct {
	ID          primitive.ObjectID `json:"id"`
	Context     string             `json:"context"`
	Status      string             `json:"status"`
	CreatedAt   time.Time          `json:"createdAt"`
	CompletedAt time.Time          `json:"completedAt"`
	DeletedAt   time.Time          `json:"deletedAt"`
}
