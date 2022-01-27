package controllers

import (
	"context"
	"fmt"
	"net/http"
	"time"
	"todo-list/middlewares"
	"todo-list/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TodoRequestBody struct {
	UserId      string `json:"userId"`
	Token       string `json:"token"`
	Context     string `json:"context"`
	ProcessType string `json:"processType"`
}

func AddTodo(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var requestBody TodoRequestBody
	if err := c.BindJSON(&requestBody); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var todo models.Todo

	todo.ID = primitive.NewObjectID()
	todo.Context = requestBody.Context
	todo.CreatedAt = time.Now()
	todo.Status = "Normal"

	if len(requestBody.Context) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please Fill Todo Field!"})
		return
	}

	hexId, err := primitive.ObjectIDFromHex(requestBody.UserId)
	if err != nil {
		fmt.Println(err)
	}

	var user models.User
	userExist := UserCollection.FindOne(ctx, bson.M{"_id": hexId})
	if err = userExist.Decode(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User Not Exist!"})
		return
	}

	if user.Token == requestBody.Token {
		result := UserCollection.FindOneAndUpdate(ctx, bson.M{"_id": hexId}, bson.M{"$push": bson.M{"todo": todo}})
		if result == nil {
			fmt.Println("FindOne And Update Failed!")
		}
		newToken, err := middlewares.CreateToken(60, hexId)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to generate new token!"})
			return
		}
		user.Token = newToken
		tokenControl := UserCollection.FindOneAndUpdate(ctx, bson.M{"_id": hexId}, bson.M{"$set": bson.M{"token": user.Token}})
		if tokenControl == nil {
			fmt.Println("Token FindOne And Update Failed!")
		}
		userExist := UserCollection.FindOne(ctx, bson.M{"_id": hexId})
		if err = userExist.Decode(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "User Not Exist!"})
			return
		}
		c.JSON(http.StatusOK, user)
	} else {
		c.JSON(http.StatusBadRequest, "Token Did Not Match!")
	}

}
