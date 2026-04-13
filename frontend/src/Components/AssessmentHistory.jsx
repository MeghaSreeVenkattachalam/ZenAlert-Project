import { useEffect, useState } from "react";
import API from "../api";

// Component to display user's assessment history
const AssessmentHistory = () => {
  const [history, setHistory] = useState([]);

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch assessment history from backend
    const fetchHistory = async () => {
      try {
        const response = await API.get(`/assessments/${userId}`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    if (userId) {
      fetchHistory();
    }
  }, [userId]);

  return (
    <div>
      <h2>Assessment History</h2>

      {/* Show message if no history */}
      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        <ul>
          {/* Display history list */}
          {history.map((item, index) => (
            <li key={index}>
              Score: {item.score} | Date: {item.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssessmentHistory;