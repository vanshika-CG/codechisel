import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import "./Codeditor.css"; 

const Judge0_API = "http://localhost:4000/api/code/run"; 

const CodeEditor = () => {
    const [code, setCode] = useState("// Write your code here");
    const [language, setLanguage] = useState("63"); // Default to JavaScript
    const [output, setOutput] = useState("");
    
    const handleRun = async () => {
      if (!code.trim()) {
          setOutput("Error: Code cannot be empty");
          return;
      }
  
      // Convert selected language ID to its string equivalent
      const languageMap = {
          "54": "cpp",
          "71": "python",
          "62": "java",
          "50": "c",
          "63": "javascript",
          "78": "kotlin",
          "79": "ruby",
          "80": "go",
          "81": "swift",
          "82": "rust"
      };
  
      const languageKey = languageMap[language]; // Convert numeric ID to string
  
      if (!languageKey) {
          setOutput("Error: Unsupported language");
          return;
      }
  
      try {
          const response = await axios.post("http://localhost:4000/api/code/run", {
              code,
              language: languageKey, // ✅ Send correct language name
          });
  
          setOutput(response.data.output || "No output");
      } catch (error) {
          console.error("Execution error:", error);
          setOutput("Error running the code");
      }
  };
  
  

    return (
      <div className="editor-container">
      <div className="editor-main">
          <div className="editor-controls">
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="dropdown">
    <option value="54">C++</option>
    <option value="71">Python</option>
    <option value="62">Java</option>
    <option value="50">C</option>
    <option value="63">JavaScript</option> {/* JavaScript will now be selected by default */}
    <option value="78">Kotlin</option>
    <option value="79">Ruby</option>
    <option value="80">Go</option>
    <option value="81">Swift</option>
    <option value="82">Rust</option>
</select>

              <button onClick={handleRun} className="run-button">Run Code</button>
          </div>
          <Editor
              height="100%"
              theme="vs-dark"
              defaultLanguage="javascript"
              defaultValue={code}
              onChange={(value) => setCode(value)}
              className="editor"
          />
      </div>
      <div className="output-container">
          <div className="output-box">
              <pre>{output}</pre>
          </div>
      </div>
  </div>
    );
};

export default CodeEditor;
