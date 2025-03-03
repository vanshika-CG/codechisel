import React, { useEffect, useState } from "react";
import "./profile.css"; // Import the CSS file

const Profile = () => {
    const [user, setUser] = useState({ username: "", email: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ✅ Fetch user profile
    useEffect(() => {
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
                setUser({ username: data.username, email: data.email });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // ✅ Handle form changes
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // ✅ Handle update
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

                // ✅ Update localStorage with the new username
                localStorage.setItem("username", user.username);

                // ✅ Trigger a re-render
                window.dispatchEvent(new Event("storage"));
            } else {
                setError(data.error || "Error updating profile");
            }
        } catch (error) {
            setError("Error updating profile. Please try again.");
            console.error("Error updating profile:", error);
        }
    };

    if (loading) return <div className="loading">Loading</div>;

    return (
        <div className="profile-container">
            <h1 className="edit">Edit Profile</h1>
            {success && <div className="success-message">{success}</div>}
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateProfile(); }}>
                <div className="form-field">
                    <label>Username:</label>
                    <input type="text" name="username" value={user.username} onChange={handleChange} required />
                </div>
                <div className="form-field">
                    <label>Email:</label>
                    <input type="email" name="email" value={user.email} onChange={handleChange} required />
                </div>
                <button className="button1" type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;