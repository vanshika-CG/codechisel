import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Courses from "./components/Courses";
import Tutorials from "./components/Tutorials";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/login";
import Notes from "./components/Notes";
import QuizList from "./components/QuizList";
import QuizDetails from "./components/QuizDetails";
import QuizSubmit from "./components/QuizSubmit";
import Getstarted from "./components/Getstarted";
import CodeEditor from "./components/Codeditor";
import UserProfile from "./components/Profile"; 
import logo from "./assets/logo.png";

const App = () => {
  const navigate = useNavigate(); // 🚨 Only works inside a component within <Router>
  const username = localStorage.getItem("username");

  // ✅ Add code state
  const [code, setCode] = useState("// Write your code here...");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <nav className="navbar">
        <div>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <div className="home">
          <Link to="/" className="color">Home</Link>
        </div>
        <div className="home1">
          <Link to="/courses" className="color">Courses</Link>
        </div>
        <div className="home1">
          <Link to="/tutorials" className="color">Tutorials</Link>
        </div>
        <div className="home1">
          <Link to="/about" className="color">About us</Link>
        </div>
        <div className="home1">
          <Link to="/contact" className="color">Contact</Link>
        </div>

        {username ? (
          <>
<Link to="/profile" className="username-link">Welcome, {username}</Link>
            <button className="logout" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="login" onClick={() => navigate("/login")}>
            SignUp/LogIn
          </button>
        )}
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
        <Route path="/getstarted" element={<Getstarted />} />
        <Route path="/code-editor" element={<CodeEditor code={code} setCode={setCode} />} /> 
        <Route path="/profile" element={<UserProfile />} /> 
      </Routes>
    </>
  );
};

export default App;
