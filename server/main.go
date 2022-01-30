package main

import (
	"fmt"
	"todo-list/controllers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.Use(cors.Default())

	router.POST("/users/register", controllers.Register)
	router.POST("/users/login", controllers.Login)

	router.POST("/todos/add_todo", controllers.AddTodo)
	router.POST("/todos/:id/todo_actions", controllers.TodoActions)

	err := router.Run(":5000")
	if err != nil {
		fmt.Println("Error:", err)
	}
}
