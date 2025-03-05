import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Software.css";

const SoftwareDevelopment = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const learningRoadmap = [
    {
      title: "Programming Fundamentals",
      topics: [
        "Programming Language Basics",
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Version Control (Git)",
        "Software Design Principles",
        "Debugging Techniques"
      ],
      description: "Build a strong foundation in core programming concepts and software development principles."
    },
    {
      title: "Web & Mobile Development",
      topics: [
        "Frontend Development (HTML, CSS, JavaScript)",
        "React & Modern JavaScript Frameworks",
        "Backend Development",
        "RESTful API Design",
        "Mobile App Development",
        "Progressive Web Applications (PWA)"
      ],
      description: "Master web and mobile development technologies and best practices."
    },
    {
      title: "Advanced Software Engineering",
      topics: [
        "Microservices Architecture",
        "Cloud-Native Development",
        "DevOps & CI/CD",
        "Test-Driven Development",
        "Software Architecture Patterns",
        "Performance Optimization"
      ],
      description: "Explore advanced software engineering concepts and professional development methodologies."
    }
  ];

  const projectIdeas = [
    "Full-Stack Web Application",
    "Mobile Task Management App",
    "E-commerce Platform",
    "Real-Time Chat Application",
    "Personal Portfolio Website"
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="ai-development-container">
      <div className="header-section">
        <h1>Software Development Learning Path</h1>
        <p>Master Modern Software Engineering and Development Techniques</p>
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
            <h3>Certification Paths</h3>
            <ul>
              <li>AWS Certified Developer</li>
              <li>Microsoft Certified: Azure Developer</li>
              <li>Google Professional Cloud Developer</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Learning Platforms</h3>
            <ul>
              <li>Udacity Nanodegree Programs</li>
              <li>freeCodeCamp</li>
              <li>Codecademy Pro</li>
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

export default SoftwareDevelopment;