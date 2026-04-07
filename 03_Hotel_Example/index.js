const express = require("express");
const app = express();
const PORT = 3000;

const db = require("./db");

const Person = require("./models/Person.model");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

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

app.get("/get-persons", async (req, res) => {
  try {
    const persons = await Person.find();
    res.status(200).json(persons);
  } catch(error) {
    console.error("Error fetching Person: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get("/", (req, res) => {
  res.send("Welcome to my Restaurent !");
});

app.get("/menu", (req, res) => {
  res.send("Different Types of Menu");
});

app.get("/menu/idli", (req, res) => {
  var customized_idli = {
    name: "rava idli",
    size: "10 cm diameter",
    is_sambhar: true,
    is_chutney: false,
  };

  res.send(customized_idli);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
