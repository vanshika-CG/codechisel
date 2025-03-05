import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
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
import Chatbot from "./components/Chatbot";

const App = () => {
  const [code, setCode] = useState("// Write your code here...");

  return (
    <>
      <Navbar />
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
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </>
  );
};

export default App;
