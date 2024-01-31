const mongoose = require("mongoose");
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: String, required: true },
});

const Client = mongoose.model("User", clientSchema);
module.exports = Client;
