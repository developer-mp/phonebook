package contact

import (
	"phonebook/server/db"

	"github.com/gofiber/fiber/v2"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Contact struct {
	gorm.Model
	Name    string `json:"name"`
	Mail   string `json:"mail"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
}

func Healthcheck(c *fiber.Ctx) error {
	return c.SendString("Health is OK")
}

func GetContacts(c *fiber.Ctx) error {

	db := db.DBConn
	var contacts []Contact
	
	result := db.Find(&contacts)
		if result.Error != nil {
		return c.SendString("Error retrieving contacts: " + result.Error.Error())
	}

	return c.JSON(contacts)
}

func UpdateContact(c *fiber.Ctx) error {
	id := c.Params("id")
	db := db.DBConn
	var contact Contact
	db.First(&contact, id)

	if contact.Name == "" {
		return c.SendString("No contact has been found for the given ID")
	}

	var updateData Contact
	if err := c.BodyParser(&updateData); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	contact.Name = updateData.Name
	contact.Phone = updateData.Phone
	contact.Mail = updateData.Mail
	contact.Address = updateData.Address

	result := db.Save(&contact)
	if result.Error != nil {
		return c.SendString("Error updating contact: " + result.Error.Error())
	}

	response := struct {
		Message string  `json:"message"`
		Contact Contact `json:"contact"`
	}{
		Message: "Contact has been updated successfully",
		Contact: contact,
	}

	return c.JSON(response)
}

func NewContact(c *fiber.Ctx) error {

	db := db.DBConn
	contact := new(Contact)

	if err := c.BodyParser(contact); err != nil {
		return c.SendStatus(fiber.StatusBadRequest)
	}

	result := db.Create(&contact)
	if result.Error != nil {
		return c.SendString("Error creating contact: " + result.Error.Error())
	}

		response := struct {
		Message string  `json:"message"`
		Contact Contact `json:"contact"`
	}{
		Message: "Contact has been created successfully",
		Contact: *contact,
	}

	return c.JSON(response)
}

func DeleteContact(c *fiber.Ctx) error {
	id := c.Params("id")
	db := db.DBConn

	var contact Contact
	result := db.First(&contact, id)
	
	if result.RecordNotFound() {
		return c.SendString("No contact has been found for the given ID")
	} else if result.Error != nil {
		return c.SendString("Error retrieving contact: " + result.Error.Error())
	}

	result = db.Delete(&contact)
	if result.Error != nil {
		return c.SendString("Error deleting contact: " + result.Error.Error())
	}

	return c.SendString("Contact has been deleted successfully")
}

// func ErrorHandler(c *fiber.Ctx, err error) error {
// 	// Custom error types
// 	type AppError struct {
// 		Message string
// 		Status  int
// 	}

// 	// Default error status
// 	status := fiber.StatusInternalServerError

// 	// Check if it's a custom error
// 	if e, ok := err.(*AppError); ok {
// 		// Set status and error message
// 		status = e.Status
// 		err = e.Message
// 	}

// 	// Log the error
// 	log.Printf("Error: %s", err)

// 	// Return error response
// 	return c.Status(status).JSON(fiber.Map{
// 		"error": err,
// 	})
// }

// func main() {
// 	// Initialize Fiber app
// 	app := fiber.New()

// 	// Custom error handler middleware
// 	app.Use(func(c *fiber.Ctx) error {
// 		defer func() {
// 			if r := recover(); r != nil {
// 				// Handle panics and convert to error
// 				err, ok := r.(error)
// 				if !ok {
// 					err = fmt.Errorf("panic: %v", r)
// 				}
// 				c.Next(err)
// 			}
// 		}()
// 		return c.Next()
// 	})

// 	// Routes
// 	app.Get("/api/contacts", GetContacts)
// 	app.Post("/api/contact", NewContact)
// 	app.Put("/api/contact/:id", UpdateContact)
// 	app.Delete("/api/contact/:id", DeleteContact)

// 	// Error handler middleware
// 	app.Use(ErrorHandler)

// 	// Start the server
// 	app.Listen(":4000")
// }