const express = require("express");
const router = express.Router();
const genericController = require("../controllers/genericControllers");

// Define CRUD routes for all collections
router.get("/:collection", genericController.getAll);
router.get("/:collection/:id", genericController.getById);
router.post("/:collection", genericController.create);
router.put("/:collection/:id", genericController.update);
router.delete("/:collection/:id", genericController.remove);

module.exports = router;
