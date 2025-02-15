import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Courses from "./components/Courses";
import Tutorials from "./components/Tutorials";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Notes from "./components/Notes";
import QuizList from "./components/QuizList";
import QuizDetails from "./components/QuizDetails";
import QuizSubmit from "./components/QuizSubmit";
import Getstarted from "./components/Getstarted";
import CodeEditor from "./components/Codeditor";

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
        <Route path="/notes" element={<Notes />} />
        <Route path="/quiz" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route path="/quiz/:id/submit" element={<QuizSubmit />} />
         <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/getstarted" element={<Getstarted />} />
      </Routes>
    </>
  );
}

export default App;
