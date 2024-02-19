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
});

const Filter = mongoose.model("filter", filterSchema);
module.exports = Filter;
