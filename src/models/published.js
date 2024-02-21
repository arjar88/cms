const mongoose = require("mongoose");

const publishedSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  uuid: { type: string, require: true },
  filtersId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Filter",
    required: true,
  },
  propertiesToShow: {
    type: [String],
    default: [],
  },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Published = mongoose.model("published", publishedSchema);
module.exports = Published;
