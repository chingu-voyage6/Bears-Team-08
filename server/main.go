package main

import (
	"fmt"
	_ "github.com/gorilla/websocket"
	_ "log"
	_ "net/http"
	"os"
)

func main() {
	env := os.Getenv("ENV")
	isDevelopment := env == "development"
	fmt.Println("Is development? ", isDevelopment)
}
