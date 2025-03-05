import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Game.css";

const GameDevelopment = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const learningRoadmap = [
    {
      title: "Game Design Fundamentals",
      topics: [
        "Game Mechanics & Design Principles",
        "Storytelling in Games",
        "Player Experience & Engagement",
        "Game Balance & Level Design"
      ],
      description: "Build a strong foundation in the core principles of game design and interactive experiences."
    },
    {
      title: "Game Development Engines & Technologies",
      topics: [
        "Unity Game Development",
        "Unreal Engine",
        "Godot Game Engine",
        "C# and C++ Programming",
        "3D & 2D Game Development"
      ],
      description: "Master popular game development platforms and programming technologies."
    },
    {
      title: "Advanced Game Development Techniques",
      topics: [
        "Game Physics Simulation",
        "Multiplayer Networking",
        "Advanced Rendering Techniques",
        "AI in Game Development",
        "Performance Optimization"
      ],
      description: "Explore advanced techniques to create sophisticated and immersive game experiences."
    }
  ];

  const projectIdeas = [
    "2D Platformer Game",
    "Puzzle Adventure Game",
    "Multiplayer Strategy Game",
    "Mobile Casual Game",
    "Survival Roguelike"
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="game-development-container">
      <div className="header-section">
        <h1>Game Development Learning Path</h1>
        <p>Transform your creativity into interactive digital worlds</p>
      </div>

      <div className="roadmap-section">
        <h2>Learning Roadmap</h2>
        {learningRoadmap.map((section, index) => (
          <div 
            key={index} 
            className={`roadmap-item ${activeSection === index ? 'active' : ''}`}
            onClick={() => toggleSection(index)}
          >
            <div className="roadmap-header">
              <h3>{section.title}</h3>
              <span className="toggle-icon">{activeSection === index ? '−' : '+'}</span>
            </div>
            {activeSection === index && (
              <div className="roadmap-details">
                <p>{section.description}</p>
                <ul>
                  {section.topics.map((topic, topicIndex) => (
                    <li key={topicIndex}>{topic}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="project-ideas-section">
        <h2>Project Ideas</h2>
        <div className="project-grid">
          {projectIdeas.map((project, index) => (
            <div key={index} className="project-card">
              <h3>{project}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="resources-section">
        <h2>Recommended Resources</h2>
        <div className="resources-grid">
          <div className="resource-card">
            <h3>Online Courses</h3>
            <ul>
              <li>Unity Game Development Masterclass</li>
              <li>Unreal Engine Professional Course</li>
              <li>Game Design & Development Certification</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Communities & Documentation</h3>
            <ul>
              <li>Unity Learn Platform</li>
              <li>Unreal Engine Documentation</li>
              <li>Game Developers Conference (GDC)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="action-section">
        <button 
          className="back-button" 
          onClick={() => navigate("/development")}
        >
          Back to Development Fields
        </button>
      </div>
    </div>
  );
};

export default GameDevelopment;