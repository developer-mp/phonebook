package main

import (
	"fmt"
	"os"
	"phonebook/server/db"

	"phonebook/server/contact"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/joho/godotenv"
)

func routes(app *fiber.App) {
	app.Get("/api/health", contact.Healthcheck)
	app.Get("/api/contact", contact.GetContacts)
	app.Put("/api/contact/:id", contact.UpdateContact)
	app.Post("/api/contact", contact.NewContact)
	app.Delete("/api/contact/:id", contact.DeleteContact)
}

func initDatabase() {
	var err error

		e := godotenv.Load() 
	if e != nil {
		fmt.Print(e)
	}
	
	host:=os.Getenv("host")
	user := os.Getenv("user")
	password := os.Getenv("password")
	dbName := os.Getenv("dbName")
	port := os.Getenv("port")

	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable", host, user, password, dbName, port)

	db.DBConn, err = gorm.Open("postgres", dsn)
	if err != nil {
		panic("Connection to the database has failed")
	}

	fmt.Println("Connection to the database has been installed")
	db.DBConn.Debug().AutoMigrate(&contact.Contact{})
	fmt.Println("Database has been migrated")
}

func GetDB() *gorm.DB {
	return db.DBConn
}

func main() {

	app := fiber.New()

    app.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
        AllowOrigins:     "*",
        AllowCredentials: true,
        AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
    }))

	initDatabase()
	routes(app)
	app.Listen(":4000")
	defer db.DBConn.Close()
}