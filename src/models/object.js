const mongoose = require("mongoose");

const objectSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  name: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Object = mongoose.model("object", objectSchema);
module.exports = Object;
