const express = require("express");
const router = express.Router();
const genericController = require("../controllers/genericControllers");
const { requireAuth } = require("../middleware/authMiddleware");

// Define CRUD routes for all collections
router.get("/:collection", requireAuth, genericController.getAll);
router.get("/:collection/:id", requireAuth, genericController.getById);
router.post("/:collection", requireAuth, genericController.create);
router.put("/:collection/:id", requireAuth, genericController.update);
router.delete("/:collection/:id", requireAuth, genericController.remove);

module.exports = router;
