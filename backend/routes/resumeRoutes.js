const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { extractResumeData, searchResume } = require("../controllers/resumeController");

const router = express.Router();

router.post("/extract", verifyToken, extractResumeData);

router.post("/search", verifyToken, searchResume);

module.exports = router;
