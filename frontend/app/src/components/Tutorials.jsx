import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Tutorials.css";

const API_KEY = "AIzaSyBtmFIoWD0bZk2EyC6VgYjJxugMUOR8-Qk"; // Replace with your YouTube API Key
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

const App = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("programming tutorial");
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // Store clicked video ID

  // Fetch YouTube videos based on search
  const fetchVideos = async (query) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          part: "snippet",
          maxResults: 10,
          q: `${query} programming tutorial`,
          key: API_KEY,
          type: "video",
          videoCategoryId: "28", // Technology category
        },
      });

      setVideos(response.data.items);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos(searchQuery); // Fetch default tutorials on page load
  }, []);

  return (
    <div className="wrapper">
    <div className="app">
      <header>
        <nav>
          <div className="nav-right">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-button" onClick={() => fetchVideos(searchQuery)}>
                🔍 Search
              </button>
              <button className="notes-button" onClick={() => navigate("/notes")}>
                📚 Make Notes
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="tutorial-grid">
        {selectedVideo ? (
          // If a video is selected, show embedded YouTube player
          <div className="video-container">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
            <button className="back-button" onClick={() => setSelectedVideo(null)}>
              🔙 Back to Tutorials
            </button>
          </div>
        ) : (
          // Show tutorial cards if no video is selected
          videos.map((video) => (
            <div key={video.id.videoId} className="card">
              <img
                src={video.snippet.thumbnails.high.url}
                alt={video.snippet.title}
                className="card-logo"
              />
              <div className="card-info">
                <h3>{video.snippet.title}</h3>
                <p>{video.snippet.channelTitle}</p>
              </div>
              <button className="watch-button" onClick={() => setSelectedVideo(video.id.videoId)}>
                Watch Now
              </button>
            </div>
          ))
        )}
      </main>

      <footer>
        <div className="footer-section">
          <h4>Learning Paths</h4>
          <ul>
            <li><a href="#">Web Development</a></li>
            <li><a href="#">Python</a></li>
            <li><a href="#">React</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <p className="feedback">Learn to code with interactive tutorials and real-time feedback.</p>
          <h2>Learning Paths</h2>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default App;
