import React from 'react';
import './Pricing.css';


const CoursePricingPage = ({ course, onBack, onEnroll }) => {
  // Pricing tiers for the course
  const pricingTiers = [
    {
      name: "Basic",
      price: 29.99,
      features: [
        "Full course access",
        "3 months access",
        "Email support",
        "Certificate of completion",
      ],
      recommended: false
    },
    {
      name: "Pro",
      price: 49.99,
      features: [
        "Full course access",
        "Lifetime access",
        "Priority email support",
        "Certificate of completion",
        "Access to community forums",
        "Downloadable resources"
      ],
      recommended: true
    },
    {
      name: "Premium",
      price: 79.99,
      features: [
        "Full course access",
        "Lifetime access",
        "24/7 support",
        "Certificate of completion",
        "Access to community forums",
        "Downloadable resources",
        "1-on-1 coaching session",
        "Access to future updates"
      ],
      recommended: false
    }
  ];

  return (
    <div className="course-pricing-page">
      <div className="pricing-header">
        <button className="back-button" onClick={onBack}>← Back to Courses</button>
        <div className="course-info">
          <div className="course-icon-large">{course.icon}</div>
          <div>
            <h1>{course.title} Course</h1>
            <p className="course-description">{course.description}</p>
          </div>
        </div>
      </div>

      <div className="pricing-container">
        {pricingTiers.map((tier, index) => (
          <div 
            key={index} 
            className={`pricing-card ${tier.recommended ? 'recommended' : ''}`}
          >
            {tier.recommended && <div className="recommended-badge">Most Popular</div>}
            <h3 className="tier-name">{tier.name}</h3>
            <div className="price">
              <span className="currency">$</span>
              <span className="amount">{tier.price}</span>
            </div>
            <ul className="features-list">
              {tier.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button 
              className="enroll-button"
              onClick={() => onEnroll(course, tier)}
            >
              Enroll Now
            </button>
          </div>
        ))}
      </div>

      <div className="course-details">
        <h2>What you'll learn</h2>
        <div className="learning-outcomes">
          <div className="outcome">
            <div className="outcome-icon">📊</div>
            <div className="outcome-text">
              <h4>Comprehensive Curriculum</h4>
              <p>Learn from beginner to advanced with our structured curriculum</p>
            </div>
          </div>
          <div className="outcome">
            <div className="outcome-icon">💻</div>
            <div className="outcome-text">
              <h4>Hands-on Projects</h4>
              <p>Apply your knowledge with practical, real-world projects</p>
            </div>
          </div>
          <div className="outcome">
            <div className="outcome-icon">🏆</div>
            <div className="outcome-text">
              <h4>Industry Recognition</h4>
              <p>Earn a certificate that's recognized by industry professionals</p>
            </div>
          </div>
          <div className="outcome">
            <div className="outcome-icon">👥</div>
            <div className="outcome-text">
              <h4>Community Support</h4>
              <p>Join our community of learners and get help when you need it</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePricingPage;