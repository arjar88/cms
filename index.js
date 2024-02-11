const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const genericRoutes = require("./src/routes/genericRoutes");
const authRoutes = require("./src/routes/authRoutes");
const cookieParser = require("cookie-parser");

//middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api", genericRoutes);
app.use("/auth", authRoutes);

startServer();

async function startServer() {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/cms-db");
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
}
