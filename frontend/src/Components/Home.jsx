import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Home.css";

// Home page component with navigation based on login status
const Home = () => {
  const navigate = useNavigate();

  // Check if user is logged in using token from localStorage
  const isLoggedIn = localStorage.getItem("token"); // changed from sessionStorage

  return (
    <div className="home-container">
      <h1>Welcome to ZenAlert</h1>
      <p>Your mental health matters. We’re here to help.</p>

      {/* Show auth buttons only if user is not logged in */}
      {!isLoggedIn && (
        <>
          <button onClick={() => navigate("/signup")}>Sign Up</button>
          <button onClick={() => navigate("/login")}>Login</button>
        </>
      )}
    </div>
  );
};

export default Home;