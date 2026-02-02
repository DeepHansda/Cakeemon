const mongoose = require("mongoose");

const connectDatabase = async () => {
  const mongoURI = process.env.MONGOURI || "mongodb://localhost:27017/cakeemon";

  try {
    await mongoose.connect(mongoURI);
    console.log("mongodb connected!");
  } catch (error) {
    console.log("mongodb connection error");
    console.log(error);
  }
};

module.exports = connectDatabase;
