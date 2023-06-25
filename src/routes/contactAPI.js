const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const Contact = require("../models/Contact");
const { v4: uuidv4 } = require('uuid');
const dataPath = path.join(__dirname, "../../data/contacts.json");

// Read data from the JSON file
const readDataFromFile = () => {
  const data = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(data);
};

// Write data to the JSON file
const writeDataToFile = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

// Get all contacts
router.get("/", (req, res) => {
  const contacts = readDataFromFile();
  res.json(contacts);
});

// Get contact by ID
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  const contacts = readDataFromFile();
  const contact = contacts.find(
    (contact) => String(contact.id) === req.params.id
  );

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ error: "Contact not found" });
  }
});

// Create a new contact
router.post("/", (req, res) => {
  let id = uuidv4();
  const { name, phone_number, email, createdAt } = req.body;
  const newContact = new Contact(id, name, phone_number, email, createdAt);
  const contacts = readDataFromFile();
  contacts.push(newContact);

  writeDataToFile(contacts);

  res.status(201).json(newContact);
});

// Update contact
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, phone_number, email, lastUpdated } = req.body;

  const contacts = readDataFromFile();
  const contact = contacts.find((contact) => String(contact.id) === id);

  if (contact) {
    contact.name = name || contact.name;
    contact.phone_number = phone_number || contact.phone_number;
    contact.email = email || contact.email;
    contact.lastUpdated = lastUpdated || contact.lastUpdated;

    writeDataToFile(contacts);

    res.json(contact);
  } else {
    res.status(404).json({ error: "Contact not found" });
  }
});

// Delete a contact
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const contacts = readDataFromFile();
  const index = contacts.findIndex((contact) => String(contact.id) === id);

  if (index !== -1) {
    const deletedContact = contacts.splice(index, 1);
    writeDataToFile(contacts);

    res.json(deletedContact[0]);
  } else {
    res.status(404).json({ error: "Contact not found" });
  }
});

module.exports = router;
