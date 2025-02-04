import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css"; 

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/login/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail: email, password }),
        credentials: "include"
      });

      const result = await response.text();
      console.log("Server Response:", result);

      if (response.ok) {
        alert("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard or home page
      } else {
        alert("Login failed: " + result);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:4000/login/logout", {
        method: "POST",
        credentials: "include"
      });

      if (response.ok) {
        alert("Logged out successfully!");
        navigate("/");
      } else {
        alert("Logout failed!");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("An error occurred while logging out.");
    }
  };

  return (
    <div className="login-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h2 className="login-title">Login</h2>
        <div className="form-group">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
          <button onClick={handleLogin} className="login-button">Login</button>
          <button onClick={() => navigate("/signup")} className="register-button">Register</button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </motion.div>
    </div>
  );
}
