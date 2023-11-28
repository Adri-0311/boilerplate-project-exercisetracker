const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  await mongoose.connect(process.env.MONGO_URI);
};

const main = () => {
  try {
    connection();
    console.log("Connect to MongoDB");
  } catch (err) {
    console.error("Error connectes from MongoDB: ", err);
  }
};

module.exports = main;
