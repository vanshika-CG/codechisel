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

      <footer>
        <div className="footer-section">
          <h4>Learning Paths</h4>
          <ul>
            <li><a href="#">Web Development</a></li>
            <li><a href="#">Python</a></li>
            <li><a href="#">React</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Documentation</a></li>
            <li><a href="#">Tutorials</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <p className="feedback">Learn to code with interactive tutorials and real-time feedback.</p>
          <h2>Learning Paths</h2>
        </div>
      </footer>

      

  
    </div>
  );
};

export default LandingPage;