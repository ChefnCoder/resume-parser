require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("./config/db")
const { generalLimiter, loginLimiter } = require("./middleware/rateLimiter");
const { morganMiddleware, logError } = require("./middleware/logger");
const setupSwagger = require("./utils/swaggerConfig");


//Routes
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

//Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://resume-parser-0tn4.onrender.com", "https://resume-parser-tanmay.netlify.app","http://localhost:5173"],
  credentials: true 
}));
app.use(generalLimiter); 
app.use(morganMiddleware);


app.use("/api/auth", loginLimiter, authRoutes);
app.use("/api/resume", resumeRoutes);



app.use((err, req, res, next) => {
  logError(err, req); 
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

setupSwagger(app);
  
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
