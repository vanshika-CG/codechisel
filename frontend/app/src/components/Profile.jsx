import React, { useEffect, useState, useRef } from "react";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({ username: "", email: "", profileImage: "", publicId: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingUsername, setEditingUsername] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  // State for password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:4000/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();
      setUser({
        username: data.username,
        email: data.email,
        profileImage: data.profileImage || "",
        publicId: data.publicId || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username: user.username, email: user.email }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Profile updated successfully!");
        localStorage.setItem("username", user.username);
        window.dispatchEvent(new Event("storage"));
        setEditingUsername(false);
        setEditingEmail(false);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || "Error updating profile");
        setTimeout(() => setError(""), 3000);
      }
    } catch (error) {
      setError("Error updating profile. Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/api/user/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setError(data.error || "Error updating password");
      }
    } catch (error) {
      setError("Error updating password. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
      

      <form className="profile-form" onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
        <div className="form-field">
          <label>Username:</label>
          <input type="text" name="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required disabled={!editingUsername} />
          <button type="button" onClick={() => setEditingUsername(!editingUsername)}>Edit</button>
        </div>

        <div className="form-field">
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required disabled={!editingEmail} />
          <button type="button" onClick={() => setEditingEmail(!editingEmail)}>Edit</button>
        </div>

        {(editingUsername || editingEmail) && <button type="submit">Save Changes</button>}
      </form>

      <form className="password-form" onSubmit={handleChangePassword}>
        <h3>Change Password</h3>
        <div className="form-field">
          <label>Current Password:</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Confirm New Password:</label>
          <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
