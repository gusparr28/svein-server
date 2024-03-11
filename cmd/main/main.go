package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gusparr28/svein-server/internal/config"
	"github.com/gusparr28/svein-server/internal/infrastructure/persistence/mongodb"
)

func main() {
	// mux instance
	mux := http.NewServeMux()

	// load env file
	config.LoadEnv()

	// get env vars
	port := os.Getenv("PORT")
	mongoDbUri := os.Getenv("MONGO_DB_URI")

	// mongodb connection
	mongoDB := mongodb.MongoDB{
		Uri: mongoDbUri,
	}
	mongoDB.Connect()

	log.Println("[main.main] server listening on port:", port)

	// server start
	http.ListenAndServe(fmt.Sprintf(":%s", port), mux)
}
