const express = require("express");
const { login } = require("../controllers/authController");
const router = express.Router();
const { validateInput, loginSchema } = require("../middleware/validateInput");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authenticate user and return JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: 
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "naval.ravikant"
 *               password:
 *                 type: string
 *                 example: "05111974"
 *     responses:
 *       200:
 *         description: User authenticated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 JWT:
 *                   type: string
 *                   example: "your.jwt.token"
 *       400:
 *         description: Bad request (missing fields).
 *       401:
 *         description: Invalid credentials.
 */

router.post("/login", validateInput(loginSchema), login);

module.exports = router;
