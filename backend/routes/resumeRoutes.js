const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { extractResumeData, searchResume } = require("../controllers/resumeController");
const { validateInput, resumeExtractSchema, resumeSearchSchema } = require("../middleware/validateInput");

const router = express.Router();
/**
 * @swagger
 * /api/resume/extract:
 *   post:
 *     summary: Extract resume data from a given PDF URL
 *     tags: [Resume]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://www.dhli.in/uploaded_files/resumes/resume_3404.pdf"
 *     responses:
 *       200:
 *         description: Successfully extracted and stored resume data.
 *       400:
 *         description: Invalid URL provided.
 *       401:
 *         description: Unauthorized (Invalid JWT).
 *       500:
 *         description: Internal Server Error.
 */
router.post("/extract",verifyToken, validateInput(resumeExtractSchema), extractResumeData);

/**
 * @swagger
 * /api/resume/search:
 *   post:
 *     summary: Search for resumes by name
 *     tags: [Resume]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Raj"
 *     responses:
 *       200:
 *         description: Resume data found.
 *       400:
 *         description: Name is required.
 *       401:
 *         description: Unauthorized (Invalid JWT).
 *       404:
 *         description: No matching resumes found.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/search", verifyToken, validateInput(resumeSearchSchema), searchResume);

module.exports = router;
