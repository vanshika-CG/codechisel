import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Machine.css";

const DataScienceML = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);

  const learningRoadmap = [
    {
      title: "Foundational Mathematics & Programming",
      topics: [
        "Linear Algebra",
        "Probability & Statistics",
        "Python Programming",
        "Mathematical Foundations of Machine Learning",
        "Data Manipulation & Analysis"
      ],
      description: "Build a strong mathematical and programming foundation essential for data science and machine learning."
    },
    {
      title: "Machine Learning & AI Technologies",
      topics: [
        "Supervised Learning Algorithms",
        "Unsupervised Learning Techniques",
        "Deep Learning & Neural Networks",
        "TensorFlow & PyTorch",
        "Scikit-learn Library",
        "Model Evaluation & Validation"
      ],
      description: "Master cutting-edge machine learning technologies and algorithmic approaches."
    },
    {
      title: "Advanced Data Science Techniques",
      topics: [
        "Big Data Processing",
        "Natural Language Processing (NLP)",
        "Computer Vision",
        "Reinforcement Learning",
        "Advanced Data Visualization",
        "Ethical AI & Bias Mitigation"
      ],
      description: "Explore advanced techniques in data science, AI, and machine learning applications."
    }
  ];

  const projectIdeas = [
    "Predictive Analytics Project",
    "Image Recognition System",
    "Recommendation Engine",
    "Natural Language Chatbot",
    "Financial Forecasting Model"
  ];

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <div className="data-science-ml-container">
      <div className="header-section">
        <h1>Data Science & Machine Learning Learning Path</h1>
        <p>Transform Data into Intelligent Insights and Innovative Solutions</p>
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
              <li>Andrew Ng's Machine Learning Course</li>
              <li>Coursera Data Science Specialization</li>
              <li>Fast.ai Deep Learning Program</li>
            </ul>
          </div>
          <div className="resource-card">
            <h3>Platforms & Communities</h3>
            <ul>
              <li>Kaggle Competitions</li>
              <li>GitHub Data Science Repositories</li>
              <li>arXiv Research Papers</li>
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

export default DataScienceML;