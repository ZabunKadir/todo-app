package middlewares

import (
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateToken(duration int, userId primitive.ObjectID) (string, error) {
	expirationTime := time.Now().Add(time.Duration(duration) * time.Minute).Unix()
	jwtKey := []byte(os.Getenv("SECRET_KEY"))

	claims := jwt.MapClaims{}
	claims["userId"] = userId
	claims["authorized"] = true
	claims["expiredTime"] = expirationTime
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
