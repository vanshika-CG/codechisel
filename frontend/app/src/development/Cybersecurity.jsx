import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cybersecurity.css";

const Cybersecurity = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const learningRoadmap = [
    {
      title: "Cybersecurity Foundations",
      topics: [
        "Network Security Fundamentals",
        "Cryptography Basics",
        "Security Protocols",
        "Risk Management",
        "Threat Intelligence",
        "Ethical Hacking Principles"
      ],
      description: "Develop a comprehensive understanding of core cybersecurity concepts and principles."
    },
    {
      title: "Advanced Security Technologies",
      topics: [
        "Penetration Testing",
        "Incident Response & Forensics",
        "Cloud Security",
        "Security Information and Event Management (SIEM)",
        "Advanced Persistent Threats (APT)",
        "Zero Trust Architecture"
      ],
      description: "Master advanced cybersecurity technologies and defensive strategies."
    },
    {
      title: "Specialized Security Domains",
      topics: [
        "Web Application Security",
        "Mobile Security",
        "IoT Security",
        "Industrial Control Systems (ICS) Security",
        "Cyber Threat Hunting",
        "Regulatory Compliance (GDPR, HIPAA, etc.)"
      ],
      description: "Explore specialized cybersecurity domains and advanced protection techniques."
    }
  ];

  const projectIdeas = [
    "Vulnerability Assessment Tool",
    "Network Intrusion Detection System",
    "Secure Communication Platform",
    "Malware Analysis Framework",
    "Security Awareness Training Platform"
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="ai-development-container">
      <div className="header-section">
        <h1>Cybersecurity Learning Path</h1>
        <p>Master Defensive and Offensive Cybersecurity Strategies</p>
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
              <li>CompTIA Security+</li>
              <li>Certified Ethical Hacker (CEH)</li>
              <li>CISSP (Certified Information Systems Security Professional)</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Learning Platforms</h3>
            <ul>
              <li>Cybrary</li>
              <li>SANS Institute Training</li>
              <li>Offensive Security Courses</li>
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

export default Cybersecurity;