const mongoose = require("mongoose");
const Property = require("./Property");

const dataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  objectId: { type: mongoose.Schema.Types.ObjectId, ref: "Object" },
  values: { type: Object, required: true },
  creationDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now },
});

dataSchema.pre("save", async function (next) {
  try {
    if (!this.objectId || !this.values) {
      throw new Error("objectId and values are required.");
    }

    const properties = await Property.find({ objectId: this.objectId });

    if (properties.length === 0) {
      throw new Error(
        `No property schema found for objectId: ${this.objectId}`
      );
    }

    const requiredProperties = properties.map((e) => e.internalName);
    const valuesProperties = Object.keys(this.values);

    if (valuesProperties.length > requiredProperties.length) {
      throw new Error("Contains excessive properties");
    }

    const missingProperties = requiredProperties.filter(
      (prop) => !valuesProperties.includes(prop)
    );

    if (missingProperties.length > 0) {
      throw new Error(
        `Missing required properties: ${missingProperties.join(", ")}`
      );
    }

    return next(); // Success case
  } catch (error) {
    return next(error); // Error case
  }
});

const Data = mongoose.model("data", dataSchema);
module.exports = Data;
