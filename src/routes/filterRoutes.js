const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filterController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/:id", requireAuth, filterController.getFiltered);

module.exports = router;
