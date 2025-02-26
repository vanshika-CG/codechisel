import React, { useEffect } from 'react';
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
import { useState } from 'react';

const AboutPage = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
    
    // For intersection observer to trigger animations when sections come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqItems = [
    {
      question: "How long does it take to complete a learning path?",
      answer: "Our learning paths are self-paced and typically take between 8-12 weeks to complete if studying 10-15 hours per week. You can adjust the pace to match your schedule and learning style."
    },
    {
      question: "Are there any prerequisites for starting a course?",
      answer: "Most of our beginner courses have no prerequisites. For intermediate and advanced courses, we'll clearly specify any required prior knowledge. We also offer assessment tools to help you choose the right starting point."
    },
    {
      question: "Do I get a certificate after completion?",
      answer: "Yes! Upon successful completion of any learning path, you'll receive a verified digital certificate that you can share with employers and add to your LinkedIn profile."
    },
    {
      question: "How is CodeChisel different from other platforms?",
      answer: "CodeChisel combines interactive coding environments, real-time feedback, AI-powered assistance, and industry-aligned projects. Our platform focuses on practical skills that employers actually look for, with curriculum updated quarterly to match industry demands."
    },
    {
      question: "Can I get help if I'm stuck on a problem?",
      answer: "Absolutely! We offer 24/7 community support, regular mentor sessions, and AI-powered hints that guide you toward solutions without giving away the answer."
    }
  ];

  const features = [
    {
      icon: "🔍",
      title: "Industry-Relevant Curriculum",
      description: "Our courses are designed with input from leading tech companies to ensure you learn what matters."
    },
    {
      icon: "💻",
      title: "Interactive Learning",
      description: "Write, test, and debug code directly in your browser with real-time feedback."
    },
    {
      icon: "🤖",
      title: "AI-Powered Assistance",
      description: "Get personalized learning recommendations and hints when you're stuck."
    },
    {
      icon: "🏆",
      title: "Portfolio-Building Projects",
      description: "Build impressive projects that showcase your skills to potential employers."
    },
    {
      icon: "👥",
      title: "Supportive Community",
      description: "Join thousands of learners in our active community for collaboration and networking."
    },
    {
      icon: "🚀",
      title: "Career Services",
      description: "Access resume reviews, interview prep, and job placement assistance."
    },
  ];

  return (
    <div className={`about-container ${animated ? 'loaded' : ''}`}>
      <section className="hero-section animate-on-scroll">
        <div className="hero-content">
          <h1>About <span className="highlight">CodeChisel</span></h1>
          <p className="hero-subtitle">Sculpting the next generation of software developers</p>
          <p className="hero-description">
            Founded in 2021, CodeChisel has helped over 25,000 students transform their coding skills and launch successful careers in tech.
            Our mission is to make high-quality coding education accessible, engaging, and directly applicable to industry needs.
          </p>
          <div className="cta-buttons">
            <button className="cta-primary">Explore Courses</button>
            <button className="cta-secondary">View Success Stories</button>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">25K+</span>
            <span className="stat-label">Students</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">48</span>
            <span className="stat-label">Courses</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">92%</span>
            <span className="stat-label">Job Placement</span>
          </div>
        </div>
      </section>

      <section className="graduate-section animate-on-scroll">
        <h2>Our Graduates Work At</h2>
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
      </section>

      <section className="mission-section animate-on-scroll">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            At CodeChisel, we believe that anyone can become a proficient programmer with the right guidance, 
            tools, and community support. Our platform is designed to break down complex concepts into 
            manageable steps, provide immediate feedback, and create a supportive environment where 
            mistakes become valuable learning opportunities.
          </p>
          <blockquote>
            "We don't just teach code—we sculpt problem-solvers ready for the challenges of tomorrow's tech landscape."
            <cite>— Alex Chen, Founder & CEO</cite>
          </blockquote>
        </div>
        <div className="mission-image">
          <div className="code-block">
            <pre>
              <code>
{`function learnToCode() {
  while (true) {
    practice();
    makeErrors();
    debugAndLearn();
    buildProjects();
    if (readyForJob()) {
      launchCareer();
      return success;
    }
  }
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="features-section animate-on-scroll">
        <h2>Why Choose CodeChisel?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="learning-path-section animate-on-scroll">
        <h2>Our Learning Approach</h2>
        <div className="path-steps">
          <div className="path-step">
            <div className="step-number">1</div>
            <h3>Discover</h3>
            <p>Take our assessment to find your ideal starting point based on your goals and experience.</p>
          </div>
          <div className="path-step">
            <div className="step-number">2</div>
            <h3>Learn</h3>
            <p>Master concepts through interactive lessons, coding challenges, and video tutorials.</p>
          </div>
          <div className="path-step">
            <div className="step-number">3</div>
            <h3>Build</h3>
            <p>Apply your knowledge by creating real-world projects with guidance from industry experts.</p>
          </div>
          <div className="path-step">
            <div className="step-number">4</div>
            <h3>Connect</h3>
            <p>Join our community, attend events, and network with peers and potential employers.</p>
          </div>
          <div className="path-step">
            <div className="step-number">5</div>
            <h3>Launch</h3>
            <p>Access career services, prepare for interviews, and land your dream job in tech.</p>
          </div>
        </div>
      </section>

      <section className="testimonials-section animate-on-scroll">
        <h2>Student Success Stories</h2>
        <div className="testimonials-slider">
          <div className="testimonial">
            <div className="testimonial-content">
              <p>"After 6 months with CodeChisel, I went from knowing nothing about programming to landing a full-stack developer role at a startup. The project-based approach made all the difference."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <h4>Sarah Johnson</h4>
                <p>Full-Stack Developer at TechStart Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section animate-on-scroll">
        <h2>Frequently Asked Questions</h2>
        <div className="accordion">
          {faqItems.map((item, index) => (
            <div className={`accordion-item ${activeAccordion === index ? 'active' : ''}`} key={index}>
              <div className="accordion-header" onClick={() => toggleAccordion(index)}>
                <h3>{item.question}</h3>
                <span className="accordion-icon">{activeAccordion === index ? '−' : '+'}</span>
              </div>
              <div className="accordion-content">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="team-section animate-on-scroll">
        <h2>Meet Our Team</h2>
        <p className="team-intro">Our expert instructors bring decades of combined industry experience from companies like Google, Amazon, and Microsoft.</p>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-image"></div>
            <h3>Alex Chen</h3>
            <p className="member-role">Founder & CEO</p>
          </div>
          <div className="team-member">
            <div className="member-image"></div>
            <h3>Maya Patel</h3>
            <p className="member-role">Head of Curriculum</p>
          </div>
          <div className="team-member">
            <div className="member-image"></div>
            <h3>James Wilson</h3>
            <p className="member-role">Lead Instructor</p>
          </div>
          <div className="team-member">
            <div className="member-image"></div>
            <h3>Sophia Rodriguez</h3>
            <p className="member-role">Career Coach</p>
          </div>
        </div>
      </section>

      <section className="cta-section animate-on-scroll">
        <h2>Ready to Start Your Coding Journey?</h2>
        <p>Join thousands of students who have transformed their careers with CodeChisel.</p>
        <div className="cta-buttons">
          <button className="cta-primary">Get Started For Free</button>
          <button className="cta-secondary">Schedule a Demo</button>
        </div>
      </section>
      <footer>
          <div className="footer-section">
            <h4>Learning Paths</h4>
            <ul>
              <li><a href="#">Web Development</a></li>
              <li><a href="#">Mobile</a></li>
              <li><a href="#">Security</a></li>
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
            <h4>Contact</h4>
            <p>support@example.com</p>
            <div className="social-links">
              <a href="#">Twitter</a>
              <a href="#">GitHub</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </footer>
      
    </div>
  );
};

export default AboutPage;