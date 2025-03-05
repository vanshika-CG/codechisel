import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Backend.css";

const BackendDevelopment = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const learningRoadmap = [
    {
      title: "Core Programming Foundations",
      topics: [
        "Server-Side Programming Languages (Python, Java, Node.js)",
        "Object-Oriented Programming Principles",
        "Data Structures & Algorithms",
        "Version Control with Git"
      ],
      description: "Build a strong foundation in programming concepts essential for backend development."
    },
    {
      title: "Web Backend Technologies",
      topics: [
        "RESTful API Design",
        "Express.js / Django / Spring Boot",
        "Database Integration (MySQL, PostgreSQL)",
        "Authentication & Security Protocols"
      ],
      description: "Master the technologies that power robust web backend systems."
    },
    {
      title: "Advanced Backend Concepts",
      topics: [
        "Microservices Architecture",
        "GraphQL & API Development",
        "Caching Strategies",
        "Scalability & Performance Optimization"
      ],
      description: "Dive deep into advanced backend development techniques and architectural patterns."
    }
  ];

  const projectIdeas = [
    "RESTful API Backend",
    "User Authentication System",
    "Real-time Chat Application",
    "E-commerce Backend Services",
    "Microservices Architecture"
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="backend-development-container">
      <div className="header-section">
        <h1>Backend Development Learning Path</h1>
        <p>Master the art of building powerful, scalable server-side applications</p>
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
              <li>Node.js Certification Course</li>
              <li>Python Backend Development</li>
              <li>Java Enterprise Edition</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Documentation & Communities</h3>
            <ul>
              <li>Node.js Official Docs</li>
              <li>Django Documentation</li>
              <li>Backend Developer Forum</li>
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

export default BackendDevelopment;