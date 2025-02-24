const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { extractResumeData, searchResume } = require("../controllers/resumeController");
const { validateInput, resumeExtractSchema, resumeSearchSchema } = require("../middleware/validateInput");

const router = express.Router();
router.post("/extract",verifyToken, validateInput(resumeExtractSchema), extractResumeData);
router.post("/search", verifyToken, validateInput(resumeSearchSchema), searchResume);

module.exports = router;
