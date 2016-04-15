package main

import (
	"html/template"
	"log"
	"net/http"
)

// Home handle the Home Page -> '/'
func Home(w http.ResponseWriter, r *http.Request) {
	log.Printf("%s - Connected \n", r.Host)
	// Serving the React App Index file
	homePage, err := template.ParseFiles("ReactApp/index.html")
	if err != nil {
		http.Error(w, "Couldn't Load Template \n", 500)
		log.Printf("Template Parse Files Error: %s \n", err)
	}

	// Execute the template
	err = homePage.Execute(w, nil)
	if err != nil {
		http.Error(w, "Couldn't Load Template \n", 500)
		log.Printf("Template Execute Error: %s \n", err)
	}
}

func main() {
	// Handling Home Page -> /
	// Serving the javascript file
	http.HandleFunc("/", Home)
	http.Handle("/build/", http.StripPrefix("/build/", http.FileServer(http.Dir("./ReactApp/build/"))))

	// Server hosted at localhost:8000
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("Localhost:800 crashed \n", err)
	}
}
