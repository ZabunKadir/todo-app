package middlewares

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func NewHash(password string, cost int) string {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), cost)
	if err != nil {
		fmt.Println("Hash Error:", err)
	}
	return string(hashedPassword)
}

func ComparePassword(hashedPassword string, password string) (bool, error) {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return false, err
	}
	return true, nil
}
