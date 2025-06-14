const mongoose = require("mongoose");
const path = require("path");

// load environment variables from .env file
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const user = process.env.MONGO_USER;
const password = encodeURIComponent(process.env.MONGO_PASSWORD);
const db_name = process.env.MONGO_DB_NODEJS;
const uri = `mongodb+srv://${user}:${password}@cluster0.v3u3f.mongodb.net/${db_name}?retryWrites=true&w=majority`; // Change this to your MongoDB URI

const connectDB = async () => {
    try {
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log("MongoDB connected (Node.js)");
    } catch (err) {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;