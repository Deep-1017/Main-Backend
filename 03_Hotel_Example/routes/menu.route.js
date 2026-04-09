const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem.model");

// Add a Menu ITems to the database
router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.status(200).json(menuItems);
  } catch (error) {
    console.error("Error fetching menuItems: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a menu accoring to their taste
router.get("/:taste", async (req, res) => {
  try {
    const tasteType = req.params.taste;

    if (
      tasteType == "Sweet" ||
      tasteType == "Sour" ||
      tasteType == "Spicy" 
    ) {
      const menu = await MenuItem.find({ taste: tasteType });
      res.json(menu);
    } else {
      console.log("Error");
    }
  } catch (err) {
    console.error("Error fetching Person: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;