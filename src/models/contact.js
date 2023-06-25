class Contact {
  constructor(id, name, phone_number, email, createdAt, lastUpdated) {
    this.id = id;
    this.name = name;
    this.phone_number = phone_number;
    this.email = email;
    this.createdAt = createdAt;
    this.lastUpdated = lastUpdated;
  }
}

module.exports = Contact;
