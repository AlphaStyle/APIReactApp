package main

import (
	"fmt"
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

// AddBlog is the API call to get all blogs
func AddBlog(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "AddBlog")
}

// GetBlogs is the API call toget all blogs
func GetBlogs(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "AddBlog")
}

// Register is the Register API call
func Register(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Register")
}

// Login is the Login API call
func Login(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Login")
}

// Logout is the Logout API call
func Logout(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "Logout")
}

func main() {
	http.HandleFunc("/Login/", Login)
	http.HandleFunc("/Logout/", Logout)
	http.HandleFunc("/Register/", Register)
	http.HandleFunc("/GetBlogs/", GetBlogs)

	// Listen and Serve on localhost:8001
	http.ListenAndServe(":8001", nil)
}
