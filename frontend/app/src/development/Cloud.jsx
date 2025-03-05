import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cloud.css";

const CloudComputing = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const learningRoadmap = [
    {
      title: "Cloud Foundations & Infrastructure",
      topics: [
        "Cloud Computing Fundamentals",
        "Cloud Service Models (IaaS, PaaS, SaaS)",
        "Network and Security Fundamentals",
        "Cloud Architecture Principles",
        "Virtualization Technologies"
      ],
      description: "Build a strong foundation in cloud computing infrastructure and core concepts."
    },
    {
      title: "Advanced Cloud Technologies",
      topics: [
        "Containerization & Kubernetes",
        "Microservices Architecture",
        "Cloud Native Development",
        "Serverless Computing",
        "Cloud Security & Compliance",
        "Multi-Cloud Strategies"
      ],
      description: "Master advanced cloud technologies and deployment methodologies."
    },
    {
      title: "Cloud Provider Expertise",
      topics: [
        "AWS Cloud Services",
        "Azure Cloud Ecosystem",
        "Google Cloud Platform",
        "Cloud Cost Optimization",
        "Cloud Migration Strategies",
        "Cloud Performance Management"
      ],
      description: "Develop expertise in major cloud platforms and advanced cloud management techniques."
    }
  ];

  const projectIdeas = [
    "Scalable Web Application",
    "Distributed Microservices System",
    "Cloud-Based Analytics Platform",
    "Serverless Event Processing",
    "Multi-Cloud Deployment Framework"
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="ai-development-container">
      <div className="header-section">
        <h1>Cloud Computing Learning Path</h1>
        <p>Master Modern Cloud Technologies and Infrastructure Solutions</p>
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
              <li>AWS Certified Solutions Architect</li>
              <li>Microsoft Azure Cloud Certification</li>
              <li>Google Cloud Professional Certification</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Learning Platforms</h3>
            <ul>
              <li>Cloud Academy</li>
              <li>Linux Foundation Cloud Courses</li>
              <li>Pluralsight Cloud Training</li>
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

export default CloudComputing;