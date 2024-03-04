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
    // Check if objectId and values are present
    if (!this.objectId || !this.values) {
      throw new Error("objectId and values are required.");
    }

    // Retrieve the property schema for the associated objectId
    const properties = await Property.find({ objectId: this.objectId });

    if (!properties) {
      throw new Error("No property schema found for the associated objectId.");
    }

    const requiredProperties = properties.map((e) => e.internalName);
    const valuesProperties = Object.keys(this.values);

    if (valuesProperties.length > requiredProperties.length) {
      throw new Error("Containes exccesive properties");
    }

    //
    const missingProperties = requiredProperties.filter(
      (prop) => !valuesProperties.includes(prop)
    );

    if (missingProperties.length > 0) {
      throw new Error(
        `Missing required properties: ${missingProperties.join(", ")}`
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Data = mongoose.model("data", dataSchema);
module.exports = Data;
