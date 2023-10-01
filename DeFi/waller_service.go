package main

import (
	"context"
	"log"
	"math/rand"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// WalletService provides wallet creation and storage functionality
type WalletService struct {
	client     *mongo.Client
	collection *mongo.Collection
}

// Wallet represents a wallet entity
type Wallet struct {
	ID           string    `bson:"_id,omitempty"`
	MobileNumber string    `bson:"mobileNumber"`
	CreatedAt    time.Time `bson:"createdAt"`
}

// NewWalletService creates a new instance of WalletService
func NewWalletService() *WalletService {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	collection := client.Database("mydb").Collection("wallets")

	return &WalletService{
		client:     client,
		collection: collection,
	}
}

func (s *WalletService) CreateWallet(mobileNumber string) (string, error) {
	randomNumber := generateRandomNumber()
	concatenatedString := mobileNumber + randomNumber
	uniqueID := generateUniqueID(concatenatedString)

	wallet := Wallet{
		ID:           uniqueID,
		MobileNumber: mobileNumber,
		CreatedAt:    time.Now(),
	}

	_, err := s.collection.InsertOne(context.Background(), wallet)
	if err != nil {
		return "", err
	}

	return uniqueID, nil
}

func generateUniqueID(concatenatedString string) string {
	panic("unimplemented")
}

func generateRandomNumber() string {
	seed := time.Now().UnixNano()
	rng := rand.New(rand.NewSource(seed))

	randomNumber := strconv.Itoa(rng.Intn(9999)) // Change the range as per your requirement
	return randomNumber
}
