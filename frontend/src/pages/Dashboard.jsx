import React from "react"; 
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome, {username || "User"}!</h1>
      <img src="/image.png" alt="Resume Illustration"className="w-96 h-auto rounded-lg shadow-md"
      />
    </div>
  );
};

export default Dashboard;
