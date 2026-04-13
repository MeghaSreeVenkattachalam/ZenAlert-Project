import React, { useState } from "react";
import axios from "axios";
import "../Styles/News.css";

// Component to fetch and display news based on search and categories
const NewsRecommend = () => {
  const [query, setQuery] = useState("");
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Available news categories
  const categories = ["Health", "Emergency Preparedness", "Safety", "Disaster Management", "Medical Updates", "Technology", "Science", "Sports", "Business", "Entertainment"];

  // Fetch news from external API
  const fetchNews = async (searchTerm) => {
    setLoading(true);
    setError("");

    try {
      // Get API key from environment variables
      const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

      if (!API_KEY) {
        throw new Error("API key is missing. Check your .env file.");
      }

      // Make request to News API
      const response = await axios.get("https://newsapi.org/v2/everything", {
        params: {
          q: searchTerm,
          language: "en",
          pageSize: 6,
          apiKey: API_KEY,
        },
      });

      setNews(response.data.articles);
    } catch (err) {
      // Handle API errors
      setError("Failed to load news. Please try again.");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input
  const handleSearch = () => {
    if (query.trim() !== "") fetchNews(query);
  };

  // Handle category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchNews(category);
  };

  return (
    <div className="news-container">
      <h2 className="title">Latest News</h2>

      {/* Search bar */}
      <div className="search-bar">
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search news..." 
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
      {loading && <p className="loading-text">Loading news...</p>}
      {error && <p className="error-text">{error}</p>}

      {/* News display */}
      <div className="news-grid">
        {news.map((article, index) => (
          <div key={index} className="news-card">
            <img src={article.urlToImage || "https://via.placeholder.com/150"} alt={article.title} />
            <h4>{article.title}</h4>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsRecommend;