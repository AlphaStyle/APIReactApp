package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"

	r "github.com/dancannon/gorethink"
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

// DBSession makes the session global
type DBSession struct {
	DB *r.Session
}

func main() {
	// Connecting to the database
	session, err := r.Connect(r.ConnectOpts{
		Address: "localhost:28015",
	})
	if err != nil {
		log.Fatalln(err)
	}
	// Make the session global
	db := DBSession{session}

	// Handling Home Page -> /
	// Serving the javascript file
	http.HandleFunc("/", Home)
	http.Handle("/build/", http.StripPrefix("/build/", http.FileServer(http.Dir("./ReactApp/build/"))))

	// API Calls
	http.HandleFunc("/api/Login/", db.Login)
	http.HandleFunc("/api/Logout/", db.Logout)
	http.HandleFunc("/api/Register/", db.Register)
	http.HandleFunc("/api/GetBlogs/", db.GetBlogs)
	http.HandleFunc("/api/AddBlog/", db.AddBlog)

	// Server hosted at localhost:8000
	err = http.ListenAndServe(":8000", nil)
	if err != nil {
		log.Fatal("Localhost:8000 crashed \n", err)
	}
}

// Blog is the blog struct
type Blog struct {
	Author  string `gorethink:"author"`
	Title   string `gorethink:"title"`
	Content string `gorethink:"content"`
}

// Blogs is the blogs struct
type Blogs struct {
	ID   int `gorethink:"id"`
	Blog `gorethink:"blogs"`
}

// GetBlogs is the API call to get all blogs
func (db DBSession) GetBlogs(w http.ResponseWriter, res *http.Request) {
	// Set header to JSON
	w.Header().Set("Content-Type", "application/json")

	b := Blog{"Author goes here", "Title goes here", "Content this is content"}

	// Send it as JSON
	blog, err := json.Marshal(b)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(blog)
}

// AddBlog is the API call toget all blogs
func (db DBSession) AddBlog(w http.ResponseWriter, res *http.Request) {
	// Set header to JSON
	w.Header().Set("Content-Type", "application/json")

	// Getting the JSON sent from Frontend
	// And then decoding the JSON to Blog Struct
	var b Blogs
	blogJSON := json.NewDecoder(res.Body)
	blogJSON.Decode(&b)
	fmt.Printf("%v \n", b)

	// Adding the JSON / Blog Struct to RethingDB
	resp, err := r.DB("api").Table("blogs").Insert(Blogs{
		ID: b.ID,
		Blog: Blog{
			Author:  b.Author,
			Title:   b.Title,
			Content: b.Content,
		}}).RunWrite(db.DB)
	if err != nil {
		log.Fatal(err)
		return
	}

	fmt.Printf("%d row inserted \n", resp.Inserted)
}

// Register is the Register API call
func (db DBSession) Register(w http.ResponseWriter, r *http.Request) {
	// Set header to JSON
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, "Register")
}

// Login is the Login API call
func (db DBSession) Login(w http.ResponseWriter, r *http.Request) {
	// Set header to JSON
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, "Login")
}

// Logout is the Logout API call
func (db DBSession) Logout(w http.ResponseWriter, r *http.Request) {
	// Set header to JSON
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, "Logout")
}
