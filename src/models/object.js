const mongoose = require("mongoose");
const objectSchema = new mongoose.Schema({
  clientId: { type: Number },
  name: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});

const Object = mongoose.model("Object", objectSchema);
module.exports = Object;
