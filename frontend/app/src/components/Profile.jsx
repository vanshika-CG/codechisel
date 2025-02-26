import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Profile.css"

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
    fetchEnrolledCourses();
  }, []);

  // Fetch User Profile
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Fetch Enrolled Courses
  const fetchEnrolledCourses = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/enrollment/my-courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  // Change Password
  const handleChangePassword = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:4000/user/change-password",
        { newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(res.data.message);
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Failed to update password.");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container mt-4">
      {user ? (
        <div className="card p-4 shadow">
          <h2 className="text-center">👤 User Profile</h2>
          <div className="text-center">
            <img src="https://via.placeholder.com/100" alt="Profile" className="rounded-circle mb-3" />
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
          </div>

          <h4>📚 Enrolled Courses</h4>
          <ul>
            {courses.length > 0 ? (
              courses.map((course) => <li key={course._id}>{course.courseId.title}</li>)
            ) : (
              <p>No enrolled courses yet.</p>
            )}
          </ul>

          <h4>🔑 Change Password</h4>
          <input
            type="password"
            className="form-control mb-2"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="btn btn-primary mb-3" onClick={handleChangePassword}>
            Update Password
          </button>
          {message && <p>{message}</p>}

          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
