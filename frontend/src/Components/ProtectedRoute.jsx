import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Component to protect routes from unauthorized access
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login if no token found
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);  

  // Render child components if authenticated
  return children;
};

export default ProtectedRoute;