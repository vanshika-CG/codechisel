import React, { useState, useEffect } from 'react';
import './Courses.css';
import DevelopmentFieldSelector from '../components/Field'; // Import the DevelopmentFieldSelector
import CoursePricingPage from '../components/Pricing'; // Import the Pricing component

// Course Card Component
const CourseCard = ({ title, icon, description, onClick }) => (
  <div className="course-card" onClick={onClick}>
    <div className="course-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDevelopmentFields, setShowDevelopmentFields] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [enrolledTier, setEnrolledTier] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
          const response = await fetch("http://localhost:4000/courses/all");
          const data = await response.json();
          console.log("Response data:", data); // Log the response data
  
          if (!response.ok) {
              throw new Error(data.error || "Failed to fetch courses");
          }
  
          if (Array.isArray(data)) {
              setCourses(data);
          } else {
              throw new Error("Invalid data format: Expected an array");
          }
      } catch (error) {
          console.error("Error fetching courses:", error);
          setError("Failed to load courses.");
      } finally {
          setLoading(false);
      }
  };
  
  
    fetchCourses();
  }, []);
  

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

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
  const handleEnroll = async (course, tier) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You must be logged in to enroll.");
        return;
      }

      const response = await fetch("http://localhost:4000/api/enrollments/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          courseId: course._id,
          tier: tier.name
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to enroll");
      }

      setEnrollmentSuccess(true);
      setEnrolledCourse(course);
      setEnrolledTier(tier);

      alert("Enrollment successful!");
    } catch (error) {
      console.error("Error enrolling:", error);
      alert(error.message);
    }
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
                {courses.map((course) => (
                  <CourseCard 
                    key={course._id} 
                    title={course.title} 
                    icon={course.icon} 
                    description={course.description} 
                    onClick={() => handleCourseClick(course)} 
                  />
                ))}
              </div>
            </section>

            <section className="explore-courses">
              <h2>Explore Our Courses</h2>
              <div className="course-grid">
                {courses.map((course) => ( // 🔹 FIXED: Changed `exploreCourses` to `courses`
                  <CourseCard 
                    key={course._id} 
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