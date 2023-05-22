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
	Email   string `json:"email"`
	Phone   string `json:"phone"`
	Address string `json:"address"`
}

func GetContacts(c *fiber.Ctx) error {

	db := db.DBConn
	var contacts []Contact
	db.Find(&contacts)
	return c.JSON(contacts)
}

func GetContact(c *fiber.Ctx) error {

	id := c.Params("id")
	db := db.DBConn
	var contact Contact
	db.First(&contact, id)
	
	if contact.Name == "" {
		return c.SendString("No contact has been found for given ID")
	}

	db.Find(&contact, id)
	return c.JSON(contact)
}

func Healthcheck(c *fiber.Ctx) error {
	return c.SendString("OK")
}

func NewContact(c *fiber.Ctx) error {

	db := db.DBConn
	contact := new(Contact)

	if err := c.BodyParser(contact); err != nil {
		return err
	}

	db.Create(&contact)
	return c.JSON(contact)
}

func DeleteContact(c *fiber.Ctx) error {

	id := c.Params("id")
	db := db.DBConn
	var contact Contact
	db.First(&contact, id)

	if contact.Name == "" {
		return c.SendString("No contact has been found for given ID")
	}

	db.Delete(&contact)
	return c.SendString("Contact has been deleted")
}