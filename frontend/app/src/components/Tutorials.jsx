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
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);

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

  // Fetch related videos when a video is selected
  const fetchRelatedVideos = async (videoId) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          part: "snippet",
          maxResults: 6,
          relatedToVideoId: videoId,
          type: "video",
          key: API_KEY,
        },
      });
      
      // If related videos API doesn't return results (which can happen), use similar search
      if (response.data.items.length === 0) {
        const selectedVideoTitle = videos.find(v => v.id.videoId === videoId)?.snippet.title || "";
        // Extract keywords from the title
        const keywords = selectedVideoTitle.split(" ").slice(0, 3).join(" ");
        
        const fallbackResponse = await axios.get(BASE_URL, {
          params: {
            part: "snippet",
            maxResults: 6,
            q: `${keywords} tutorial`,
            key: API_KEY,
            type: "video",
            videoCategoryId: "28",
          },
        });
        
        setRelatedVideos(fallbackResponse.data.items.filter(v => v.id.videoId !== videoId));
      } else {
        setRelatedVideos(response.data.items);
      }
    } catch (error) {
      console.error("Error fetching related videos:", error);
      // Fallback to showing other videos from main search
      setRelatedVideos(videos.filter(v => v.id.videoId !== videoId).slice(0, 6));
    }
  };

  useEffect(() => {
    fetchVideos(searchQuery); // Fetch default tutorials on page load
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      fetchRelatedVideos(selectedVideo);
    }
  }, [selectedVideo]);

  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId);
    window.scrollTo(0, 0); // Scroll to top when video is selected
  };

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

        <main>
          {selectedVideo ? (
            // Video page layout with main video and suggested videos
            <div className="video-page">
              <div className="main-video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo}`}
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
                
                <h2 className="video-title">
                  {videos.find(v => v.id.videoId === selectedVideo)?.snippet.title}
                </h2>
                <p className="channel-name">
                  {videos.find(v => v.id.videoId === selectedVideo)?.snippet.channelTitle}
                </p>
                
                <div className="video-controls">
                  <button className="back-button" onClick={() => setSelectedVideo(null)}>
                    🔙 Back to Tutorials
                  </button>
                </div>
              </div>
              
              <div className="suggested-videos">
                <h3>Suggested Videos</h3>
                <div className="suggested-videos-list">
                  {relatedVideos.map((video) => (
                    <div 
                      key={video.id.videoId} 
                      className="suggested-video-card"
                      onClick={() => handleVideoSelect(video.id.videoId)}
                    >
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="suggested-thumbnail"
                      />
                      <div className="suggested-info">
                        <h4>{video.snippet.title}</h4>
                        <p>{video.snippet.channelTitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Show tutorial cards if no video is selected
            <div className="tutorial-grid">
              {videos.map((video) => (
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
                  <button className="watch-button" onClick={() => handleVideoSelect(video.id.videoId)}>
                    Watch Now
                  </button>
                </div>
              ))}
            </div>
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