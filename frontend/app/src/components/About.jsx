// LandingPage.js
import React from 'react';
import './About.css';
import img1 from "../assets/amazon.png";
import img2 from "../assets/google.png";
import img3 from "../assets/microsoft.png";
import img4 from "../assets/goldman.png";
import img5 from "../assets/airtel.png";
import img6 from "../assets/dell.png";
import img7 from "../assets/delo.png";
import img8 from "../assets/kpmg.png";
import img9 from "../assets/jp.png";
import img10 from "../assets/salesforce.png";
import img11 from "../assets/hitachi.png";
import img12 from "../assets/ibm.png";


const LandingPage = () => {
  return (
    <div className="landing-container">
    

      <main className="main-content">
        <h1>Thousands of students achieved their dream job at</h1>
        
        <div className="company-logos">
          <div className="logo-grid">
            <img src={img1} alt="Amazon" className="company-logo" />
            <img src={img2} alt="Google" className="company-logo" />
            <img src={img3} alt="Microsoft" className="company-logo" />
            <img src={img4} alt="Goldman Sachs" className="company-logo" />
            <img src={img5} alt="Airtel" className="company-logo" />
            <img src={img6} alt="Dell" className="company-logo" />
            <img src={img7} alt="Deloitte" className="company-logo" />
            <img src={img8} alt="KPMG" className="company-logo" />
            <img src={img9} alt="JP Morgan" className="company-logo" />
            <img src={img10} alt="Salesforce" className="company-logo" />
            <img src={img11} alt="Hitachi" className="company-logo" />
            <img src={img12} alt="IBM" className="company-logo" />
          </div>
          <p className="more-text">+ many more</p>
        </div>
      </main>

      <footer className="footer">
        <div className="footer-section">
          <h3>Learning Paths</h3>
          <p>Learn to code with interactive tutorials and real-time feedback.</p>
          <ul>
            <li>Web Development</li>
            <li>Python</li>
            <li>Javascript</li>
            <li>React</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Resources</h3>
          <ul>
            <li>Documentation</li>
            <li>Community</li>
            <li>Blog</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Support@codemaster.com</p>
          <p>+1(555) 123-4567</p>
          <div className="social-links">
            <a href="#twitter">Twitter</a>
            <a href="#github">GitHub</a>
            <a href="#linkedin">LinkedIn</a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 CodeMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;