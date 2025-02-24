const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();
const { validateInput, loginSchema } = require("../middleware/validateInput");

router.post("/login", validateInput(loginSchema), login);

module.exports = router;
