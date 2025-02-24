require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db");
const { generalLimiter, loginLimiter } = require("./middleware/rateLimiter");
const { logger, morganMiddleware, logError } = require("./middleware/logger");

//Routes
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(generalLimiter); 
app.use(morganMiddleware);


app.use("/api/auth", loginLimiter, authRoutes);
app.use("/api/resume", resumeRoutes);



app.use((err, req, res, next) => {
  logError(err, req); // ✅ Log errors as [ERROR]
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
