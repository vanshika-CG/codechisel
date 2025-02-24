import React, { useState } from 'react';
import './Courses.css';
import DevelopmentFieldSelector from '../components/Field'; // Import the DevelopmentFieldSelector
import CoursePricingPage from '../components/Pricing'; // Import the Pricing component

// Course Card Component
const CourseCard = ({ title, icon, description, onClick }) => (
  <div className="course-card" onClick={onClick}>  {/* Added onClick */}
    <div className="course-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="view-details">View Details</div>
  </div>
);

const Courses = () => {
  const [showDevelopmentFields, setShowDevelopmentFields] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [enrolledTier, setEnrolledTier] = useState(null);

  // My Courses
  const myCourses = [
    { title: "Python", icon: "🐍", description: "Learn the basics of Python programming and master essential concepts." },
    { title: "HTML", icon: "📝", description: "Understand HTML fundamentals and build structured web pages." },
    { title: "JavaScript", icon: "⚡", description: "Master JavaScript programming and modern web development." }
  ];

  // Explore Courses
  const exploreCourses = [
    { title: "C Programming", icon: "C", description: "Master C programming fundamentals and memory management." },
    { title: "SQL", icon: "📊", description: "Learn database management and SQL query optimization." },
    { title: "C++", icon: "C++", description: "Advanced programming with C++ and object-oriented concepts." },
    { title: "Java Basic to Java", icon: "☕", description: "Comprehensive Java programming from basics to advanced." },
    { title: "ASP.NET Core", icon: "🌐", description: "Build modern web applications with ASP.NET Core." },
    { title: "C#", icon: "C#", description: "Learn C# programming and .NET framework development." },
    { title: "Python", icon: "🐍", description: "Advanced Python concepts and application development." },
    { title: "Angular", icon: "🅰️", description: "Build dynamic web applications with Angular framework." },
    { title: "React", icon: "⚛️", description: "Create modern user interfaces with React components." }
  ];

  // Show the development fields selector
  const handleChoosePathClick = () => {
    setShowDevelopmentFields(true);
  };

  // Set the selected course to navigate to the pricing page
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  // Go back to course selection
  const handleBackClick = () => {
    setSelectedCourse(null);
    setEnrollmentSuccess(false);
  };

  // Handle Enrollment
  const handleEnroll = (course, tier) => {
    setEnrolledCourse(course);
    setEnrolledTier(tier);
    setEnrollmentSuccess(true);
  };

  return (
    <div className="wrapper">
      <div className="app">
        {enrollmentSuccess ? (
          // Show enrollment success message
          <div className="enrollment-success">
            <div className="success-icon">✅</div>
            <h2>Enrollment Successful!</h2>
            <p>You have successfully enrolled in the <strong>{enrolledCourse.title}</strong> course.</p>
            <p>Plan: <strong>{enrolledTier.name}</strong> - ${enrolledTier.price}</p>
            <p>An email with access details has been sent to your inbox.</p>
            <button className="back-to-courses-btn" onClick={handleBackClick}>
              Back to Courses
            </button>
          </div>
        ) : selectedCourse ? (
          // Show the pricing page for the selected course
          <CoursePricingPage 
            course={selectedCourse}
            onBack={handleBackClick}
            onEnroll={handleEnroll}
          />
        ) : showDevelopmentFields ? (
          // Show the development fields selector
          <DevelopmentFieldSelector />
        ) : (
          // Show the main courses page
          <main>
            <section className="my-courses">
              <h2>My Courses</h2>
              <div className="course-grid">
                {myCourses.map((course, index) => (
                  <CourseCard 
                    key={index} 
                    {...course} 
                    onClick={() => handleCourseClick(course)}
                  />
                ))}
              </div>
            </section>

            <section className="explore-courses">
              <h2>Explore Our Courses</h2>
              <div className="course-grid">
                {exploreCourses.map((course, index) => (
                  <CourseCard 
                    key={index} 
                    {...course} 
                    onClick={() => handleCourseClick(course)}
                  />
                ))}
              </div>
            </section>

            <section className="cta">
              <h2>Take your coding skills to the next level!</h2>
              <p>Start learning today with our expert-led courses and comprehensive curriculum.</p>
              <button className="choose-path-btn" onClick={handleChoosePathClick}>
                Choose your Path
              </button>
            </section>
          </main>
        )}

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
    </div>
  );
};

export default Courses;


