package main

import (
	"todo-list/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	router.POST("/users/register", controllers.Register)
	router.POST("/users/login", controllers.Login)

	router.POST("/todos/addTodo", controllers.AddTodo)
	//router.GET("/todos", controllers.GetTodos)

	router.Run(":5000")
}
