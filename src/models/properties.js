const mongoose = require("mongoose");
const propertiesSchema = new mongoose.Schema({
  objectId: { type: mongoose.Schema.Types.ObjectId, ref: "Object" },
  name: { type: String, required: true },
  internalName: { type: String, required: true },
  type: { type: String, required: true },
});

const Properties = mongoose.model("properties", propertiesSchema);
module.exports = Properties;
