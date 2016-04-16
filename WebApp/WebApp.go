package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"

	r "github.com/dancannon/gorethink"
)

// Connecting to the Database "RethinkDB"
func init() {
	// Session
	var session *r.Session

	// Connecting to the database
	session, err := r.Connect(r.ConnectOpts{
		Address:  "localhost:28015",
		Database: "api",
	})
	if err != nil {
		log.Fatalln(err)
	}

	// Testing only......
	res, err := r.Expr("Hello World").Run(session)
	if err != nil {
		log.Fatalln(err.Error())
	}

	var response string
	err = res.One(&response)
	if err != nil {
		log.Fatalln(err.Error())
	}

	fmt.Println(response)
}

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

	// API Calls
	http.HandleFunc("/api/Login/", Login)
	http.HandleFunc("/api/Logout/", Logout)
	http.HandleFunc("/api/Register/", Register)
	http.HandleFunc("/api/GetBlogs/", GetBlogs)
	http.HandleFunc("/api/AddBlog/", AddBlog)

	// Server hosted at localhost:8000
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("Localhost:800 crashed \n", err)
	}
}

// --------------------------------- API calls ---------------------------------------------

// Blog is the blog struct
type Blog struct {
	Author  string `gorethink:"author"`
	Title   string `gorethink:"title"`
	Content string `gorethink:"content"`
	ID      int    `gorethink:"id"`
}

// GetBlogs is the API call to get all blogs
func GetBlogs(w http.ResponseWriter, r *http.Request) {
	// Set header to JSON
	w.Header().Set("Content-Type", "application/json")

	b := Blog{"Author goes here", "Title goes here", "Content this is content", 1}

	// Send it as JSON
	blog, err := json.Marshal(b)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(blog)
}

// AddBlog is the API call toget all blogs
func AddBlog(w http.ResponseWriter, r *http.Request) {
	// Set header to JSON
	w.Header().Set("Content-Type", "application/json")

	fmt.Fprintln(w, "AddBlog")
}

// Register is the Register API call
func Register(w http.ResponseWriter, r *http.Request) {
	// Set header to JSON
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, "Register")
}

// Login is the Login API call
func Login(w http.ResponseWriter, r *http.Request) {
	// Set header to JSON
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, "Login")
}

// Logout is the Logout API call
func Logout(w http.ResponseWriter, r *http.Request) {
	// Set header to JSON
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, "Logout")
}
