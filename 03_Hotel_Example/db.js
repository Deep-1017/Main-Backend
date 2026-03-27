const mongoose = require("mongoose");

// MONGODB CONNECTION STRING
const MongoURI = "mongodb://localhost:27017/hotel";

// CONNECTING TO MONGODB
mongoose.connect(MongoURI);

const db = mongoose.connection


db.on('connected', () => {
  console.log("Mongodb connected successfully");
});
db.on('disconnected', () => {
  console.log("Mongodb disconnected successfully");
});
db.on('error', (err) => {
  console.log("Mongodb connection error: ", err);
});


module.exports = db;