const express = require("express");
const router = express.Router();
const Person = require("../models/Person.model");

// Add a new person to the database
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const savedPerson = await newPerson.save();

    console.log("Saved person to database");
    res.status(201).json(savedPerson);
  } catch (error) {
    console.error("Error saving Person: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all persons from the database
router.get("/", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    console.error("Error fetching Person: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a person accoring to their worktype
router.get("/:work", async (req, res) => {
  try {
    const workType = req.params.work;

    if (
      workType == "chef" ||
      workType == "manager" ||
      workType == "waiter" ||
      workType == "owner"
    ) {
      const persons = await Person.find({ work: workType });
      res.json(persons);
    } else {
      console.log("Error");
    }
  } catch (err) {
    console.error("Error fetching Person: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// To update a person
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedData = req.body;

    const updatedPerson = await Person.findByIdAndUpdate(
      personId,
      updatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json(updatedPerson);
  } catch (err) {
    console.error("Error updating Person: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// To delete a person
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // Extract the person's ID from the URL parameter
    // Assuming you have a Person model
    const deletedPerson = await Person.findByIdAndDelete(personId);
    if (!deletedPerson) {
      return res.status(404).json({ error: "Person not found" });
    }
    // Send a success message as a JSON response
    res.json({ message: "Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting person:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
