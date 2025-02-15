import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CodeEditor from './Codeditor'; // Import the CodeEditor component
import './Getstarted.css';
import clock from "../assets/clock.png";
import graph from "../assets/bargraph.png";
import points from "../assets/topic.png";
import teacher from "../assets/teacher.png";

const LearningPlatform = () => {
  const [showEditor, setShowEditor] = useState(false); // State to toggle editor
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="main">
        <div className="started">
          <h1 className="getting">Getting Started With Javascript.</h1>
          <div className="flex">
            <div className="min">
              <img src={clock} alt="clock" className="clock" />
              <p className="read">30 min read</p>
            </div>
            <div className="min">
              <img src={graph} alt="graph" className="graph" />
              <p className="beg">Beginner</p>
            </div>
          </div>

          <p className="fund">
            Learn the fundamentals of JavaScript programming language with this comprehensive tutorial.
            We’ll cover everything from basic syntax to advanced concepts.
          </p>
          <h1 className="table">Table of Contents</h1>

          <div className="topics"><img src={points} alt="points" className="points" /><p className="lan">Introduction to JavaScript</p></div>
          <div className="topics1"><img src={points} alt="points" className="points" /><p className="lan">Variables and Datatypes</p></div>
          <div className="topics1"><img src={points} alt="points" className="points" /><p className="lan">Control Flow Statement</p></div>
          <div className="topics1"><img src={points} alt="points" className="points" /><p className="lan">JavaScript Functions</p></div>
          <div className="topics1"><img src={points} alt="points" className="points" /><p className="lan">JavaScript Arrays</p></div>
          <div className="topics1"><img src={points} alt="points" className="points" /><p className="lan">JavaScript Objects</p></div>

          {/* Clickable Editor */}
          <div className="editor" onClick={() => navigate("/code-editor")}>
            <p className="comments1">// Your first JavaScript code</p>
            <p className="comments1">let message = "Hello, World!";</p>
            <p className="comments1">console.log(message);</p>
          </div>

          {/* Show CodeEditor when clicked */}
          {showEditor && <CodeEditor />}
        </div>
      </div>

      <div className="side">
        <div className="user">
          <div className="profile">
            <img src={teacher} alt="teacher" className="teacher" />
            <div className="adjust">
              <h2 className="admin">John Smith</h2>
              <p className="deve">Senior Developer</p>
            </div>
          </div>
          <p className="js">JavaScript expert with 10+ years of experience in web development</p>
        </div>
       <div className="tuto">

       </div>

       <div className="user1">

       </div>
      </div>
    </div>
  );
};

export default LearningPlatform;
