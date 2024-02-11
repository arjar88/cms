const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  objectId: { type: mongoose.Schema.Types.ObjectId, ref: "Object" },
  name: { type: String, required: true },
  internalName: { type: String, required: true },
  type: { type: String, required: true },
});

const Property = mongoose.model("property", propertySchema);
module.exports = Property;
