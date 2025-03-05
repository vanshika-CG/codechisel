import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Mobile.css";

const MobileDevelopment = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const learningRoadmap = [
    {
      title: "Foundational Mobile Development Skills",
      topics: [
        "Mobile App Architecture",
        "UI/UX Design Principles",
        "Mobile User Experience (UX) Design",
        "Cross-Platform vs Native Development"
      ],
      description: "Build a solid foundation in mobile application development concepts and design principles."
    },
    {
      title: "Mobile Development Frameworks",
      topics: [
        "React Native",
        "Flutter & Dart",
        "Android (Kotlin/Java)",
        "iOS Development (Swift)",
        "Xamarin & .NET MAUI"
      ],
      description: "Master popular mobile development frameworks and platforms for building robust applications."
    },
    {
      title: "Advanced Mobile Development Techniques",
      topics: [
        "Performance Optimization",
        "Mobile App Security",
        "State Management",
        "Offline Functionality",
        "Push Notifications & Backend Integration"
      ],
      description: "Explore advanced techniques to build sophisticated, high-performance mobile applications."
    }
  ];

  const projectIdeas = [
    "Personal Finance Tracker",
    "Fitness Tracking App",
    "Social Media Clone",
    "Task Management App",
    "Local Restaurant Finder"
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="mobile-development-container">
      <div className="header-section">
        <h1>Mobile Development Learning Path</h1>
        <p>Transform your ideas into powerful mobile applications across platforms</p>
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
              <li>Udacity Mobile Development Nanodegree</li>
              <li>React Native Certification</li>
              <li>Flutter & Dart Masterclass</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Documentation & Communities</h3>
            <ul>
              <li>Android Developers Documentation</li>
              <li>Apple Developer Resources</li>
              <li>Flutter Official Documentation</li>
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

export default MobileDevelopment;