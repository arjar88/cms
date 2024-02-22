const express = require("express");
const router = express.Router();
const filterController = require("../controllers/filterController");
const { requireAuth } = require("../middleware/authMiddleware");

router.get("/:id", requireAuth, filterController.getFiltered);
router.get("/published/:uuid", filterController.getPublished);

module.exports = router;
