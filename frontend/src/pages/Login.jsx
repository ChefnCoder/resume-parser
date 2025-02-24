import React from "react"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("naval.ravikant");
  const [password, setPassword] = useState("05111974");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, { 
        username, 
        password 
      });
  
      // Ensure JWT token exists before setting it
      if (!response.data.JWT) {
        setError("No token received. Check API response.");
        return;
      }
  
      localStorage.setItem("token", response.data.JWT);
      localStorage.setItem("username", username);
  
      console.log("Navigating to /dashboard...");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100);
      
      
    } catch (err) {
      console.error("Login Error:", err.response ? err.response.data : err);
      if (err.response && err.response.status === 429) {
        setError("Too many login attempts. Please try again later.");
      } else {
        setError("Invalid credentials. Try again.");
      }
      
    }

  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Login to Resume Parser</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input 
              type="text" 
              className="w-full p-2 border rounded" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border rounded" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
