const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./db");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Import the routes
const personRoutes = require("./routes/person.route");
const menuRoutes = require("./routes/menu.route");

// Use the routes
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
