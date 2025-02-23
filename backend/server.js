require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db");

//Routes
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
