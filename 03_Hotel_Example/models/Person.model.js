const mongoose = require("mongoose");

// Create a Person Schema
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  work: {
    type: String,
    enum: ["chef", "owner", "manager", "waiter", "cleaner"],
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true
  },
});

// Creating a Model
const Person = mongoose.model("Person", PersonSchema);

module.exports = Person;
