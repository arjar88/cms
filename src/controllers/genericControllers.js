const mongoose = require("mongoose");

// Define CRUD operations for all collections
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
  try {
    const Model = mongoose.model(collection);
    const updatedDocument = await Model.findByIdAndUpdate(
      id,
      { ...data },
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
