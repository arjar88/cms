const mongoose = require("mongoose");
const propertiesSchema = new mongoose.Schema({
  objectId: { type: Number, required: true },
  name: { type: String, required: true },
  internalName: { type: String, required: true },
  type: { type: String, required: true },
});

const Properties = mongoose.model("Object", propertiesSchema);
module.exports = Properties;
