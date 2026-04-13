import React, { useState } from "react";
import axios from "axios";
import "../Styles/Videorecommend.css";

// Component to fetch and display mental wellness videos
const Videorecommend = () => {  
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Predefined video categories
  const categories = [
    "Self help", "Reducing stress", "Anxiety", 
    "Panic attacks", "Breathing exercises", 
    "Stretching", "Calm music", "Meditation"
  ];

  // Fetch videos from YouTube API
  const fetchVideos = async (searchTerm) => {
    setLoading(true);
    setError("");

    try {
      // Get API key from environment variables
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

      if (!API_KEY) {
        throw new Error("API key is missing. Check your .env file.");
      }

      // Send request to YouTube Data API
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            q: searchTerm,
            type: "video",
            maxResults: 6,
            key: API_KEY,
          },
        }
      );

      setVideos(response.data.items);
    } catch (err) {
      // Handle API errors
      setError("Failed to load videos. Please try again.");
      console.error("Error fetching videos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input
  const handleSearch = () => {
    if (query.trim() !== "") fetchVideos(query);
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchVideos(category);
  };

  return (
    <div className="video-container">
      <h2 className="title">Mental Wellness Videos</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search videos..." 
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Category filters */}
      <div className="categories">
        {categories.map((category, index) => (
          <button 
            key={index} 
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading & error states */}
      {loading && <p className="loading-text">Loading videos...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* Video display */}
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id.videoId} className="video-card">
            <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            <h4>{video.snippet.title}</h4>

            {/* Open video in new tab */}
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
              Watch
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videorecommend;