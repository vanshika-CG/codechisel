import React from "react";
import { useNavigate } from "react-router-dom";
import "./Field.css";

const DevelopmentFieldSelector = () => {
  const navigate = useNavigate(); // Initialize navigation function

  // Function to handle button clicks and navigate
  const handleExplore = (path) => {
    navigate(path);
  };

  return (
    <div className="wrapper">
      <div className="development-field-selector">
        <div className="field-container">
          <h2 className="field-title">Mobile Development</h2>
          <p className="field-description">Build native and cross-platform mobile apps.</p>
          <button className="field-button" onClick={() => handleExplore("/mobile-development")}>
            Explore Now
          </button>
        </div>

        <div className="field-container">
          <h2 className="field-title">Frontend Development</h2>
          <p className="field-description">Master the art of building beautiful web interfaces.</p>
          <button className="field-button" onClick={() => handleExplore("/frontend-development")}>
            Explore Now
          </button>
        </div>

        <div className="field-container">
          <h2 className="field-title">Backend Development</h2>
          <p className="field-description">Dive into server-side technologies and APIs.</p>
          <button className="field-button" onClick={() => handleExplore("/backend-development")}>
            Explore Now
          </button>
        </div>

        <div className="field-container">
          <h2 className="field-title">Game Development</h2>
          <p className="field-description">Bring your game ideas to life with code.</p>
          <button className="field-button" onClick={() => handleExplore("/game-development")}>
            Explore Now
          </button>
        </div>

        <div className="field-container">
          <h2 className="field-title">Data Science and Machine Learning</h2>
          <p className="field-description">Uncover insights and build intelligent systems.</p>
          <button className="field-button" onClick={() => handleExplore("/data-science")}>
            Explore Now
          </button>
        </div>

        <div className="field-container">
          <h2 className="field-title">Artificial Intelligence (AI)</h2>
          <p className="field-description">Dive into the world of AI and automation.</p>
          <button className="field-button" onClick={() => handleExplore("/ai")}>
            Explore Now
          </button>
        </div>

        <div className="field-container">
          <h2 className="field-title">Cloud Computing</h2>
          <p className="field-description">Master the cloud and build scalable applications.</p>
          <button className="field-button" onClick={() => handleExplore("/cloud-computing")}>
            Explore Now
          </button>
        </div>

        <div className="field-container">
          <h2 className="field-title">Cybersecurity</h2>
          <p className="field-description">Protect digital assets and safeguard systems.</p>
          <button className="field-button" onClick={() => handleExplore("/cybersecurity")}>
            Explore Now
          </button>
        </div>

        <div className="field-container">
          <h2 className="field-title">Software Development</h2>
          <p className="field-description">Master the full software development lifecycle.</p>
          <button className="field-button" onClick={() => handleExplore("/software-development")}>
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentFieldSelector;
