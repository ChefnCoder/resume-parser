import React from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import SearchResume from "./pages/SearchResume";
import Login from "./pages/Login";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Check if JWT exists

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/upload" element={isAuthenticated ? <UploadResume /> : <Navigate to="/login" />} />
        <Route path="/search" element={isAuthenticated ? <SearchResume /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;
