const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please Enter A Valid Email"],
  },
  password: {
    type: String,
    required: [true, "Password is Required"],
    minlength: [6, "Password Length must be seven characters minimum"],
  },
  role: {
    type: String,
    enum: ["master admin", "admin", "user"],
    default: "user",
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
