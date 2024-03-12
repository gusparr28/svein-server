package mongodb

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoDB struct {
	Uri string
}

func (mongoDB MongoDB) Connect() {
	const seconds = 10

	ctx := setTimeout(time.Duration(seconds))

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(mongoDB.Uri))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			panic(err)
		}
	}()

	log.Println("[mongodb.Connect] successfully connected to MongoDB")
}

func setTimeout(seconds time.Duration) context.Context {
	ctx, cancel := context.WithTimeout(context.TODO(), seconds*time.Second)

	defer cancel()

	return ctx
}
