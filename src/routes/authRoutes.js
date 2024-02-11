const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.post("/signUp", authControllers.signUp);
router.post("/signIn", authControllers.signIn);

module.exports = router;
