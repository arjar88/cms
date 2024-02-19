const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema({
  objectId: { type: mongoose.Schema.Types.ObjectId, ref: "Object" },
  filters: {
    type: [
      [
        {
          property: { type: String, required: true },
          operator: { type: String, required: true },
          value: { type: mongoose.Schema.Types.Mixed, required: true },
        },
      ],
    ],
    required: true,
  },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

const Filter = mongoose.model("filter", filterSchema);
module.exports = Filter;
