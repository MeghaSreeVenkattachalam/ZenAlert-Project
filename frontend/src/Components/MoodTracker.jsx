import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import "../Styles/MoodTracker.css";

// Backend API base URL
const API_URL = "http://localhost:8080/api/moods";

// Temporary user ID (can be replaced with logged-in user)
const USER_ID = "user123"; // later connect with login user

// Component to track mood, store history, and display reports
const MoodTracker = () => {
  const [mood, setMood] = useState(6);
  const [moodHistory, setMoodHistory] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Convert numeric mood value to readable text
  const getMoodText = (value) => {
    if (value <= 3) return "Very Sad 😭";
    if (value <= 5) return "Sad 😢";
    if (value <= 7) return "Okay 😐";
    if (value <= 9) return "Good 😊";
    return "Great 😃";
  };

  // Fetch mood history from backend
  const fetchMoodHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/${USER_ID}`);
      setMoodHistory(res.data.reverse()); // latest first
    } catch (err) {
      console.error(err);
    }
  };

  // Load mood history on component mount
  useEffect(() => {
    fetchMoodHistory();
  }, []);

  // Save current mood to backend
  const handleSaveMood = async () => {
    try {
      const newMood = {
        userId: USER_ID,
        moodLevel: mood,
        moodDescription: getMoodText(mood),
      };

      await axios.post(API_URL, newMood);
      fetchMoodHistory(); // refresh after save
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a single mood entry
  const handleDeleteHistory = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchMoodHistory();
    } catch (err) {
      console.error(err);
    }
  };

  // Clear all mood history for user
  const handleClearHistory = async () => {
    try {
      await axios.delete(`${API_URL}/clear/${USER_ID}`);
      fetchMoodHistory();
    } catch (err) {
      console.error(err);
    }
  };

  // Generate simple mood insight based on recent data
  const getMoodInsight = () => {
    if (moodHistory.length < 3) return "Not enough data yet.";

    const avg =
      moodHistory
        .slice(0, 5)
        .reduce((sum, m) => sum + m.moodLevel, 0) /
      Math.min(5, moodHistory.length);

    if (avg < 4) return "⚠️ Your mood seems low recently.";
    if (avg < 7) return "🙂 You're doing okay.";
    return "🔥 Great mood trend!";
  };

  // Prepare data for chart visualization
  const chartData = moodHistory.map((item) => ({
    date: new Date(item.timestamp).toLocaleDateString(),
    mood: item.moodLevel,
  }));

  return (
    <div className={`container ${darkMode ? "dark" : ""}`}>
      <div className="mood-card">
        <h2>💙 How are you feeling today?</h2>

        {/* Toggle dark/light mode */}
        <button
          className="toggle-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* Mood selection UI */}
        <div className="emoji-container">
          {[
            { value: 2, emoji: "😭", label: "Very Sad" },
            { value: 4, emoji: "😢", label: "Sad" },
            { value: 6, emoji: "😐", label: "Okay" },
            { value: 8, emoji: "😊", label: "Good" },
            { value: 10, emoji: "😃", label: "Great" },
          ].map((item) => (
            <div
              key={item.value}
              className={`emoji-box ${
                mood === item.value ? "active" : ""
              }`}
              onClick={() => setMood(item.value)}
            >
              <span>{item.emoji}</span>
              <small>{item.label}</small>
            </div>
          ))}
        </div>

        <p>{getMoodText(mood)}</p>

        {/* Save mood */}
        <button className="save-btn" onClick={handleSaveMood}>
          Save Mood
        </button>

        {/* Mood insight */}
        <p className="insight">{getMoodInsight()}</p>

        <h3>Mood History</h3>
        {moodHistory.map((entry) => (
          <div key={entry.id} className="mood-history-item">
            <p>
              {new Date(entry.timestamp).toLocaleString()} -{" "}
              {entry.moodDescription}
            </p>

            {/* Delete single entry */}
            <button
              className="delete-btn"
              onClick={() => handleDeleteHistory(entry.id)}
            >
              Delete
            </button>
          </div>
        ))}

        {/* Clear all history */}
        <button
          className="clear-history-btn"
          onClick={handleClearHistory}
        >
          Clear All
        </button>

        {/* Show report */}
        <button
          className="report-btn"
          onClick={() => setShowReport(true)}
        >
          Show Report
        </button>
      </div>

      {/* Mood report popup with chart */}
      {showReport && (
        <div className="report-popup">
          <div className="report-content">
            <h3>📊 Mood Report</h3>

            <BarChart width={300} height={200} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="mood" fill="#ff6b81" />
            </BarChart>

            <button
              className="close-btn"
              onClick={() => setShowReport(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;