import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Courses from "./components/Courses";
import Tutorials from "./components/Tutorials";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";

function App() {
  const navigate = useNavigate(); 

  return (
    <>
      <nav className='navbar'>
        <div className='home'><Link to="/" className="color">Home</Link></div>
        <div className='home1'><Link to="/courses" className="color">Courses</Link></div>
        <div className='home1'><Link to="/tutorials" className="color">Tutorials</Link></div>
        <div className='home1'><Link to="/about" className="color">About us</Link></div>
        <div className='home1'><Link to="/contact" className="color">Contact</Link></div>
        <button className='login' onClick={() => navigate('/login')}>
          SignUp/LogIn
        </button>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </>
  );
}

export default App;
