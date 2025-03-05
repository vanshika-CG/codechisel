import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Ai.css";

const AIDevelopment = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const learningRoadmap = [
    {
      title: "AI Foundations & Theoretical Concepts",
      topics: [
        "Artificial Intelligence Fundamentals",
        "Cognitive Computing Principles",
        "Ethical AI & Responsible Development",
        "AI Philosophy and Limitations",
        "Mathematical Foundations of AI"
      ],
      description: "Develop a comprehensive understanding of AI's core principles and theoretical frameworks."
    },
    {
      title: "Advanced AI Technologies",
      topics: [
        "Machine Learning Algorithms",
        "Neural Networks & Deep Learning",
        "Natural Language Processing (NLP)",
        "Computer Vision",
        "Generative AI Models",
        "AI Model Training & Optimization"
      ],
      description: "Master cutting-edge AI technologies and advanced implementation techniques."
    },
    {
      title: "Specialized AI Applications",
      topics: [
        "Robotics & Autonomous Systems",
        "AI in Healthcare",
        "AI for Business Intelligence",
        "Reinforcement Learning",
        "AI Security & Adversarial Techniques",
        "Large Language Models & Transformers"
      ],
      description: "Explore specialized domains and advanced applications of artificial intelligence."
    }
  ];

  const projectIdeas = [
    "Intelligent Chatbot",
    "Computer Vision System",
    "Predictive Analytics Engine",
    "Autonomous Robot Control",
    "AI-Powered Recommendation System"
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="ai-development-container">
      <div className="header-section">
        <h1>Artificial Intelligence (AI) Learning Path</h1>
        <p>Unlock the Potential of Intelligent Systems and Cognitive Technologies</p>
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
              <li>Stanford AI Professional Program</li>
              <li>Google AI & Machine Learning Certification</li>
              <li>MIT Professional AI Courses</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Research & Communities</h3>
            <ul>
              <li>OpenAI Research</li>
              <li>AI Research Conferences</li>
              <li>DeepMind Publications</li>
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

export default AIDevelopment;