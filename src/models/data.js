const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  objectId: { type: Number, required: true },
  value: { type: Object, required: true },
});

const Data = mongoose.model("Object", dataSchema);
module.exports = Data;
