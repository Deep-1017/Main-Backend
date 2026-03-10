const express = require("express");
const app = express();
const PORT = 3000;

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

  res.send(customized_idli.size);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
