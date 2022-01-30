package controllers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"
	"todo-list/db"
	"todo-list/middlewares"
	"todo-list/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var UserCollection *mongo.Collection = db.OpenCollection(db.Client, os.Getenv("UserCollectionName"))

func Register(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	var user models.User

	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if user.Name == "" || user.Surname == "" || user.Email == "" || user.Password == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please Fill All Fields!"})
		return
	}
	userExist := UserCollection.FindOne(ctx, bson.M{"email": user.Email})
	if err := userExist.Decode(&user); err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email Already Exist!"})
		return
	}
	user.ID = primitive.NewObjectID()
	user.CreatedAt = time.Now()
	user.IsAdmin = false
	user.Todo = []models.Todo{}
	token, err := middlewares.CreateToken(60, user.ID)
	if err != nil {
		fmt.Println("Token Not Created!")
	}
	user.Token = token
	user.Password = middlewares.CreateHash(user.Password, 13)

	_, insertErr := UserCollection.InsertOne(ctx, user)
	if insertErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User Was Not Created"})
		return
	}
	c.JSON(http.StatusOK, user)
}

func Login(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	var userRequest models.LoginRequest
	if err := c.BindJSON(&userRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(userRequest.Email) == 0 || len(userRequest.Password) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please Fill All Fields!"})
		return
	}
	var user models.User
	userExist := UserCollection.FindOne(ctx, bson.M{"email": userRequest.Email})
	if err := userExist.Decode(&user); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "User Not Exist!"})
		return
	}

	passwordControl, err := middlewares.ComparePassword(user.Password, userRequest.Password)
	if err != nil {
		fmt.Println(err)
	}
	if passwordControl {
		c.JSON(http.StatusOK, user)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email Or Password Not Correct!"})
		return
	}
}
