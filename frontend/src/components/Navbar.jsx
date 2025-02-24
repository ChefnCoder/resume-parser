import React from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // Fetch username from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    localStorage.removeItem("username"); // Remove stored username
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };
 
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      
      <Link to="/dashboard" className="text-xl font-bold cursor-pointer">
        Resume Parser
      </Link>
      <div className="space-x-4">
        <Link to="/search" className="bg-white text-blue-600 px-4 py-2 rounded">Search Your Resume</Link>
        <Link to="/upload" className="bg-white text-blue-600 px-4 py-2 rounded">Upload Your Resume</Link>
        <span className="px-4 py-2 border border-white rounded">{username || "User"}</span>
        <button 
        onClick={handleLogout} 
        className="bg-red-500 px-4 py-2 rounded cursor-pointer hover:bg-red-700 transition-all">
        Logout
      </button>


      </div>
    </nav>
  );
};

export default Navbar;
