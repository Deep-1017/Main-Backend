const express = require("express");
const app = express();
const PORT = 3000;

const db = require("./db");

const Person = require("./models/Person.model");
const MenuItem = require("./models/MenuItem.model");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Add a new person to the database
app.post("/add-person", async (req, res) => {
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
app.get("/get-persons", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch (error) {
    console.error("Error fetching Person: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a person accoring to their worktype
app.get("/get-persons/:work", async (req, res) => {
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

// Add a Menu ITems to the database
app.post("/menu-item", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const savedMenuItem = await newMenuItem.save();
    // console.log("Menu Created");
    res.status(200).json(savedMenuItem);
  } catch (err) {
    console.error("Error saving Menu: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all persons from the database
app.get("/get-menuItem", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menuItems: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/", (req, res) => {
//   res.send("Welcome to my Restaurent !");
// });

// app.get("/menu", (req, res) => {
//   res.send("Different Types of Menu");
// });

// app.get("/menu/idli", (req, res) => {
//   var customized_idli = {
//     name: "rava idli",
//     size: "10 cm diameter",
//     is_sambhar: true,
//     is_chutney: false,
//   };
//   res.send(customized_idli);
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
