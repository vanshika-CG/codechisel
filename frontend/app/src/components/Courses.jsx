import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import "./Courses.css";
import DevelopmentFieldSelector from "../components/Field";
import CoursePricingPage from "../components/Pricing";

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
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDevelopmentFields, setShowDevelopmentFields] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [enrollmentSuccess, setEnrollmentSuccess] = useState(false);
  const [enrolledCourse, setEnrolledCourse] = useState(null);
  const [enrolledTier, setEnrolledTier] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchMyCourses();
  }, []);

  // Fetch all available courses
  const fetchCourses = async () => {
    try {
      const response = await fetch("https://codechisel.onrender.com/courses/all");
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to fetch courses");
      if (Array.isArray(data)) setCourses(data);
      else throw new Error("Invalid data format: Expected an array");
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch enrolled courses for the logged-in user
  const fetchMyCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("https://codechisel.onrender.com/api/enrollments/my-courses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to fetch enrolled courses");

      setMyCourses(data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      setMyCourses([]);
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  // Handle course selection
  const handleCourseClick = (course) => {
    const isEnrolled = myCourses.some(
      (enrollment) => enrollment.courseId && enrollment.courseId._id === course._id
    );    
  
    if (isEnrolled) {
      alert(`You are already enrolled in ${course.title}. Redirecting to course content.`);
      return;
    }
  
    setSelectedCourse(course);
  };
  

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

      const response = await fetch("https://codechisel.onrender.com/api/enrollments/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: course._id, tier: tier.name }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to enroll");

      setEnrollmentSuccess(true);
      setEnrolledCourse(course);
      setEnrolledTier(tier);
      fetchMyCourses(); // Refresh enrolled courses
      fetchCourses(); // Refresh available courses

      alert("Enrollment successful!");
    } catch (error) {
      console.error("Error enrolling:", error);
      alert(error.message);
    }
  };

  // Filter out enrolled courses from the explore section
  const filteredCourses = courses.filter(
    (course) =>
      !myCourses.some(
        (enrollment) => enrollment.courseId && enrollment.courseId._id === course._id
      )
  );
  




  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to delete a course.");
        return;
      }
  
      // Add 'removing' class for animation
      const courseElement = document.getElementById(`course-${courseId}`);
      if (courseElement) {
        courseElement.classList.add("removing");
      }
  
      setTimeout(async () => {
        const response = await fetch(`https://codechisel.onrender.com/courses/delete/${courseId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to delete course");
  
        alert("Course deleted successfully!");
        fetchMyCourses();
      }, 600); // Delay deletion to allow animation to play
    } catch (error) {
      console.error("Error deleting course:", error);
      alert(error.message);
    }
  };
  
  

  return (
    <div className="wrapper">
      <div className="app">
        {enrollmentSuccess ? (
          <div className="enrollment-success">
            <div className="success-icon">✅</div>
            <h2>Enrollment Successful!</h2>
            <p>
              You have successfully enrolled in <strong>{enrolledCourse.title}</strong>.
            </p>
            <p>
              Plan: <strong>{enrolledTier.name}</strong> - ${enrolledTier.price}
            </p>
            <p>An email with access details has been sent to your inbox.</p>
            <button className="back-to-courses-btn" onClick={handleBackClick}>
              Back to Courses
            </button>
          </div>
        ) : selectedCourse ? (
          <CoursePricingPage course={selectedCourse} onBack={handleBackClick} onEnroll={handleEnroll} />
        ) : showDevelopmentFields ? (
          <DevelopmentFieldSelector />
        ) : (
          <main>
         {/* My Courses Section */}
<section className="my-courses">
  <h2>My Courses</h2>
  {myCourses.length === 0 ? (
    <p>You have not enrolled in any courses yet.</p>
  ) : (
    <div className="course-grid">
      {myCourses
  .filter((enrollment) => enrollment.courseId)
  .map((enrollment) => (
    <div key={enrollment._id} id={`course-${enrollment.courseId._id}`} className="course-card">
      <CourseCard
        title={enrollment.courseTitle}
        icon={enrollment.courseId.icon}
        description={enrollment.courseId.description}
        onClick={() => handleCourseClick(enrollment.courseId)}
      />
      <button className="delete-btn" onClick={() => handleDeleteCourse(enrollment.courseId._id)}>
        <Trash size={20} />
      </button>
    </div>
  ))}
    </div>
  )}
</section>


            {/* Explore Courses Section */}
            <section className="explore-courses">
              <h2>Explore Our Courses</h2>
              <div className="course-grid">
                {filteredCourses.map((course) => (
                  <CourseCard key={course._id} {...course} onClick={() => handleCourseClick(course)} />
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
              <h2>Take your coding skills to the next level!</h2>
              <p>Start learning today with our expert-led courses and comprehensive curriculum.</p>
              <button className="choose-path-btn" onClick={() => setShowDevelopmentFields(true)}>
                Choose your Path
              </button>
            </section>
          </main>
        )}

        {/* Footer */}
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
