package controllers

import (
	"context"
	"fmt"
	"net/http"
	"time"
	"todo-list/db"
	"todo-list/middlewares"
	"todo-list/models"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var UserCollection *mongo.Collection = db.OpenCollection(db.Client, "users")

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
	user.Password = middlewares.NewHash(user.Password, 13)

	_, insertErr := UserCollection.InsertOne(ctx, user)
	if insertErr != nil {
		msg := fmt.Sprintf("User Was Not Created")
		c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
		return
	}
	c.JSON(http.StatusOK, user)
}

func Login(c *gin.Context) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if len(user.Email) == 0 || len(user.Password) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Please Fill All Fields!"})
		return
	}
	fmt.Println(user)
	userExist := UserCollection.FindOne(ctx, bson.M{"email": user.Email})
	if err := userExist.Decode(&user); err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "User Not Exist!"})
		return
	}

	c.JSON(http.StatusOK, user)
	//passwordControl,err := middlewares.ComparePassword(userExist.password,user.Password)

}
