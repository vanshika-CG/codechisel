import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Frontend.css";

const FrontendDevelopment = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const learningRoadmap = [
    {
      title: "Foundational Skills",
      topics: [
        "HTML5 Semantic Structure",
        "CSS3 Advanced Styling",
        "Responsive Design Principles",
        "JavaScript Fundamentals"
      ],
      description: "Build a solid foundation in web technologies that power modern web applications."
    },
    {
      title: "Modern Frameworks",
      topics: [
        "React.js Ecosystem",
        "State Management (Redux, Context API)",
        "Next.js & Server-Side Rendering",
        "Vue.js & Svelte Basics"
      ],
      description: "Learn cutting-edge frameworks that define modern web development."
    },
    {
      title: "Advanced Techniques",
      topics: [
        "Performance Optimization",
        "Web Accessibility",
        "CSS Preprocessors (SASS, LESS)",
        "Animations & Interactions"
      ],
      description: "Elevate your skills with advanced web development techniques."
    }
  ];

  const projectIdeas = [
    "Personal Portfolio Website",
    "E-commerce Product Page",
    "Weather Application",
    "Task Management Dashboard",
    "Social Media Clone"
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="frontend-development-container">
      <div className="header-section">
        <h1>Frontend Development Learning Path</h1>
        <p>Unlock the power of creating stunning, interactive web experiences</p>
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
              <li>freeCodeCamp</li>
              <li>Udemy Web Development</li>
              <li>Coursera Frontend Track</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Documentation & Tutorials</h3>
            <ul>
              <li>MDN Web Docs</li>
              <li>React Official Docs</li>
              <li>Frontend Masters</li>
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

export default FrontendDevelopment;