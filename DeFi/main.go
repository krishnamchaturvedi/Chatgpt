package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/createWallet", createWalletHandler).Methods("POST")
	http.ListenAndServe(":8080", r)
}

func createWalletHandler(w http.ResponseWriter, r *http.Request) {
	mobileNumber := r.FormValue("mobileNumber")

	validator := NewMobileNumberValidator()
	if !validator.IsValid(mobileNumber) {
		http.Error(w, "Invalid mobile number", http.StatusBadRequest)
		return
	}

	walletService := NewWalletService()
	uniqueID, err := walletService.CreateWallet(mobileNumber)
	if err != nil {
		log.Println("Error creating wallet:", err)
		http.Error(w, "Failed to create wallet", http.StatusInternalServerError)
		return
	}

	w.Write([]byte("Unique ID: " + uniqueID))
}
