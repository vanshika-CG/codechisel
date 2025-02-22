import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const loginData = isRegister
      ? formData
      : { usernameOrEmail: formData.email, password: formData.password }; // ✅ Use correct field names
  
    console.log("Sending Data:", loginData); // ✅ Log the fixed data
  
    try {
      const endpoint = isRegister ? "register" : "login";
      const response = await axios.post(`http://localhost:4000/${endpoint}`, loginData);
  
      if (!isRegister) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        navigate("/");
        window.location.reload();
      } else {
        alert("Registration successful! Please log in.");
        setIsRegister(false);
      }
    } catch (err) {
      console.error("Error Response:", err.response); // ✅ Log error response
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  
  

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isRegister ? "Create an Account" : "Login to Your Account"}</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
          )}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

          <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </form>

        <p className="toggle" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </p>
      </div>
    </div>
  );
};

export default Login;
