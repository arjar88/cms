const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
  objectId: { type: mongoose.Schema.Types.ObjectId, ref: "Object" },
  values: { type: Object, required: true },
});

const Data = mongoose.model("data", dataSchema);
module.exports = Data;
