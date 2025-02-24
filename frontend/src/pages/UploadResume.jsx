import React from "react"; 
import { useState } from "react";
import axios from "axios";

const UploadResume = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError("");
    setResumeData(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/resume/extract`,
        { url: pdfUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setResumeData(response.data);
    } catch (err) {
      setError("Failed to process resume. Please check the URL and try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
      <form onSubmit={handleUpload} className="w-96 bg-white p-6 shadow-md rounded">
        <label className="block text-gray-700 mb-2">Resume PDF URL:</label>
        <input 
          type="url" 
          className="w-full p-2 border rounded mb-4" 
          value={pdfUrl} 
          onChange={(e) => setPdfUrl(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? "Processing..." : "Upload & Analyze"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {resumeData && (
        <div className="mt-6 p-4 w-96 bg-white shadow-md rounded">
          <h3 className="text-xl font-bold">Extracted Resume Data</h3>
          <p><strong>Name:</strong> {resumeData.name}</p>
          <p><strong>Email:</strong> {resumeData.email}</p>
          <h4 className="font-semibold mt-2">Education</h4>
          <p>{resumeData.education.degree}, {resumeData.education.branch}</p>
          <p>{resumeData.education.institution} ({resumeData.education.year})</p>
          <h4 className="font-semibold mt-2">Experience</h4>
          {resumeData.experience.length > 0 ? (
            resumeData.experience.map((exp, index) => (
              <p key={index}>{exp.job_title} at {exp.company} ({exp.start_date} - {exp.end_date})</p>
            ))
          ) : (
            <p>No experience listed.</p>
          )}
          <h4 className="font-semibold mt-2">Skills</h4>
          <p>{resumeData.skills.join(", ")}</p>
          <h4 className="font-semibold mt-2">Summary</h4>
          <p>{resumeData.summary}</p>
        </div>
      )}
    </div>
  );
};

export default UploadResume;
