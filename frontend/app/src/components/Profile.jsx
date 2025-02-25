import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'; // Import styles

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        console.error("No token found, redirecting...");
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
        setFormValues(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>

      {user ? (
        isEditing ? (
          <form onSubmit={handleSubmit} className="profile-card">
            <img src={formValues.profilePicture} alt="Profile" className="profile-picture" />
            <input type="text" name="profilePicture" value={formValues.profilePicture} onChange={handleChange} placeholder="Profile Picture URL" />
            <input type="text" name="name" value={formValues.name} onChange={handleChange} required />
            <input type="email" name="email" value={formValues.email} onChange={handleChange} required />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <div className="profile-card">
            <img src={user.profilePicture} alt="Profile" className="profile-picture" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
          </div>
        )
      ) : (
        <p>Loading profile...</p>
      )}

      {user?.enrolledCourses?.length > 0 && (
        <div className="courses-section">
          <h3>Enrolled Courses</h3>
          <ul className="course-list">
            {user.enrolledCourses.map(course => (
              <li key={course.id} className="course-item">
                <h4>{course.title}</h4>
                <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${course.progress}%` }}></div>
                </div>
                <span>{course.progress}% Complete</span>
                <Link to={`/courses/${course.id}`} className="view-course-link">View Course</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {user?.badges?.length > 0 && (
        <div className="badges-section">
          <h3>Badges Earned</h3>
          <div className="badges-list">
            {user.badges.map((badge, index) => (
              <div key={index} className="badge">
                <img src={badge.imageUrl} alt={badge.name} className="badge-image" />
                <p>{badge.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
