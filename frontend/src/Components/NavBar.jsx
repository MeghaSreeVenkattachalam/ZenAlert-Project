import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/NavBar.css";

// Navbar component to handle navigation and user session
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Check login status using token
  const isLoggedIn = localStorage.getItem("token");

  const [message, setMessage] = useState("");

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setMessage("Logged out successfully 👋");

    // Remove message after 2 seconds
    setTimeout(() => {
      setMessage("");
    }, 2000);

    // Redirect to login page
    setTimeout(() => {
      navigate("/login");
    }, 50);
  };

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <Link className="logo" to="/">
          ZenAlert
        </Link>

        {/* Mobile menu toggle button */}
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>

        {/* Navigation links */}
        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          {isLoggedIn ? (
            <>
              <li><Link to="/mental-wellbeing">Mental Well-being</Link></li>
              <li><Link to="/emergency">Emergency</Link></li>
              <li><Link to="/videorecommend">VideoRecommendation</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/taskmanager">Task Manager</Link></li>
              <li><Link to="/moodtracker">Mood Tracker</Link></li>

              {/* Logout option */}
              <li>
                <Link to="/login" onClick={handleLogout} className="logout-link">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </nav>

      {/* Display logout success message */}
      {message && (
        <p style={{ color: "green", textAlign: "center", padding: "10px" }}>
          {message}
        </p>
      )}
    </>
  );
};

export default Navbar;