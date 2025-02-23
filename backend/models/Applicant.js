const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  education: {
    degree: { type: String, required: true },
    branch: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: String, required: true }
  },
  experience: [
    {
      job_title: { type: String, required: false, default: "N/A" },
      company: { type: String, required: false, default: "N/A" },
      start_date: { type: String, required: false, default: "N/A" },
      end_date: { type: String, required: false, default: "N/A" }
    }
  ],
   
  skills: { type: [String], required: true },
  summary: { type: String, required: true }
}, { timestamps: true });

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
