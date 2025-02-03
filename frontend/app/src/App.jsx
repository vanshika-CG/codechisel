import { useState } from 'react'
import './App.css'
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Courses from "./components/Courses";
import Tutorials from "./components/Tutorials";
import About from "./components/About";
import Contact from "./components/Contact";

function App() {

  return (
    <>
   
    <nav className='navbar'>
      <div className='home'><Link to="/" className="color">Home</Link></div>
      <div className='home1'><Link to="/course" className="color">Courses</Link></div>
      <div className='home1'><Link to="/tutorials" className="color">Tutorials</Link></div>
      <div className='home1'><Link to="/about" className="color">About us</Link></div>
      <div className='home1'><Link to="/contact" className="color">Contact</Link></div>
      <button className='login'>SignUp/LogIn</button>
    </nav>
    
    <Routes>
      <Route path ="/" element={<Home />}/>
      <Route path ="/courses" element={<Courses />}/>
      <Route path ="/tutorials" element={<Tutorials />}/>
      <Route path ="/about" element={<About />}/>
      <Route path ="/contact" element={<Contact />}/>
    </Routes>
    </>
  )
}

export default App
