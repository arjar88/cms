const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  objectId: { type: mongoose.Schema.Types.ObjectId, ref: "Object" },
  name: { type: String, required: true },
  internalName: { type: String },
  type: {
    type: String,
    required: true,
    enum: [
      "text",
      "select",
      "file",
      "image", //aws buckets
      "images",
      "Number",
      "HTML", //tiny mc
      "url", //regex to vslidate
      "date",
      "dateTime",
      "time", //
      "boolean", //checkbox
    ],
  },
  optionsTitle: { type: String },
  options: {
    type: [
      {
        name: String,
        internalName: String,
      },
    ],
  },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

//make sure to make property names belonging to same object UNIQUE!!

//will modify internal name to have all lowercase and underscores between words
propertySchema.pre("save", function (next) {
  this.internalName = this.name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .replace(/\s+/g, "_");

  // Conditionally set the 'options' field based on the 'type'
  if (this.type !== "select") {
    this.options = undefined; // Remove 'options' property for non-'select' types
  } else {
    this.options.forEach((e) => {
      e.internalName = e.name
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "_");
    });
  }

  next();
});

const Property = mongoose.model("property", propertySchema);
module.exports = Property;
