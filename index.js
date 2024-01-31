const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const genericRoutes = require("./src/routes/genericRoutes");

app.get("/api", genericRoutes);

// Connect to MongoDB
startServer();

async function startServer() {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/cms-db");
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
    // Now you can start your Express app or perform other actions
  } catch (error) {
    console.log(error);
    console.error("Error connecting to MongoDB:", error.message);
    // Handle the error or exit the application if necessary
  }
}
