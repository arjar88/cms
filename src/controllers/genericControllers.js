const mongoose = require("mongoose");
const Client = require("../models/Client.js");
const Object = require("../models/Object.js");
const Properties = require("../models/Property.js");
const Data = require("../models/Data.js");
const Filter = require("../models/Filter.js");
const Published = require("../models/Published.js");
const Relationship = require("../models/Relationship.js");
const RelationshipData = require("../models/RelationshipData.js");


const isRoleAuthorized = (userRole, collection) => {
  const allowedRoles = {
    client: ["master admin"],
    object: ["master admin", "admin"],
    property: ["master admin", "admin"],
    data: ["master admin", "admin"],
    filter: ["master admin", "admin"],
  };

  return (
    allowedRoles[collection] && allowedRoles[collection].includes(userRole)
  );
};

const getAll = async (req, res) => {
  const { collection } = req.params;
  try {
    const Model = mongoose.model(collection);
    const documents = await Model.find();
    res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getById = async (req, res) => {
  const { collection, id } = req.params;
  try {
    const Model = mongoose.model(collection);
    const document = await Model.findById(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.status(200).json(document);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const create = async (req, res) => {
  const { collection } = req.params;
  const { data } = req.body;
  try {
    const Model = mongoose.model(collection);
    const newDocument = new Model({ ...data });
    await newDocument.save();
    res.status(201).json({ message: "Document added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const update = async (req, res) => {
  const { collection, id } = req.params;
  const { data } = req.body;

  if (!isRoleAuthorized(req.user.role, collection)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const Model = mongoose.model(collection);
    const updatedDocument = await Model.findByIdAndUpdate(
      id,
      { ...data, updateDate: Date.now },
      { new: true }
    );
    if (!updatedDocument) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.status(200).json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const remove = async (req, res) => {
  const { collection, id } = req.params;
  try {
    const Model = mongoose.model(collection);
    const deletedDocument = await Model.findByIdAndDelete(id);
    if (!deletedDocument) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
