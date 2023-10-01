package main

import (
    "context"
    "fmt"
    "io/ioutil"
    "log"
    "net/http"
    "os"

    "cloud.google.com/go/storage"
)

func competitionhandler(w http.ResponseWriter, r *http.Request) {
    // Fetch data from the API

    query := r.URL.Query().Get("q")
    fmt.Println("query",query)
    response, err := http.Get("https://serpapi.com/search?api_key=02917d3b6d79bd9ba055861074585a6f0998fe0142eca80906d43ea62effb21c&q=%22"+ query)
    if err != nil {
        fmt.Print(err.Error())
        os.Exit(1)
    }
    defer response.Body.Close()

    // Read API response
    responseData, err := ioutil.ReadAll(response.Body)
    if err != nil {
        log.Fatal(err)
    }
    // fmt.Println(string(responseData))

    // Google Cloud Storage setup
    ctx := context.Background()
    client, err := storage.NewClient(ctx)
    if err != nil {
        log.Fatalf("Failed to create client: %v", err)
    }
    defer client.Close()

    // Define the target object path in Cloud Storage
    bucketName := "my-unique-bucket-877"
    objectName := query

    // Upload data to Cloud Storage
    wc := client.Bucket(bucketName).Object(objectName).NewWriter(ctx)
    if _, err := wc.Write(responseData); err != nil {
        fmt.Printf("Failed to upload data: %v\n", err)
        return
    }
    if err := wc.Close(); err != nil {
        fmt.Printf("Failed to close writer: %v\n", err)
        return
    }
}

func main(){
    http.HandleFunc("/competition", competitionhandler)
    // fmt.Println("Server listening on :8080")
    http.ListenAndServe(":8080", nil)
}