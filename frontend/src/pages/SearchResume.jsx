import React from "react"; 
import { useState } from "react";
import axios from "axios";

const SearchResume = () => {
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setSearchResults([]);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/resume/search`,
        { name: searchName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSearchResults(response.data);
    } catch (err) {
      if (err.response && err.response.status === 429) {
        setError("Too many requests. Please wait before trying again.");
      } else {
        setError("No matching resumes found.");
      }
      
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Search Resume</h2>
      <form onSubmit={handleSearch} className="w-96 bg-white p-6 shadow-md rounded">
        <label className="block text-gray-700 mb-2">Enter Name:</label>
        <input 
          type="text" 
          className="w-full p-2 border rounded mb-4" 
          value={searchName} 
          onChange={(e) => setSearchName(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {searchResults.length > 0 && (
        <div className="mt-6 w-96">
          <h3 className="text-xl font-bold">Search Results</h3>
          {searchResults.map((applicant) => (
            <div key={applicant._id} className="bg-white p-4 shadow-md rounded mb-4">
              <p><strong>Name:</strong> {applicant.name}</p>
              <p><strong>Email:</strong> {applicant.email}</p>
              <h4 className="font-semibold mt-2">Education</h4>
              <p>{applicant.education.degree}, {applicant.education.branch}</p>
              <p>{applicant.education.institution} ({applicant.education.year})</p>
              <h4 className="font-semibold mt-2">Experience</h4>
              {applicant.experience.length > 0 ? (
                applicant.experience.map((exp, index) => (
                  <p key={index}>{exp.job_title} at {exp.company} ({exp.start_date} - {exp.end_date})</p>
                ))
              ) : (
                <p>No experience listed.</p>
              )}
              <h4 className="font-semibold mt-2">Skills</h4>
              <p>{applicant.skills.join(", ")}</p>
              <h4 className="font-semibold mt-2">Summary</h4>
              <p>{applicant.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResume;
