import React, { useState } from "react";
import axios from "axios";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "./Codeditor.css";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const handleRun = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/code/run", {
        code,
        language,
      });
      setOutput(res.data.output);
    } catch (error) {
      setOutput("Error executing code");
    }
  };

  return (
    <div className="codeditor-wrapper">
      <div className="codeditor-container">
        <div className="editor-container">
          <h2>Online Code Editor</h2>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="java">Java</option>
          </select>
          <button onClick={() => setCode("")} className="clear-button">Clear</button>

          <button onClick={handleRun} className="run-button">Run Code</button>

          <CodeMirror
            value={code}
            options={{
              mode: language === "python" ? "python" : language === "java" ? "text/x-java" : "javascript",
              theme: "material",
              lineNumbers: true,
            }}
            onBeforeChange={(editor, data, value) => setCode(value)}
          />
        </div>

        <div className="output-container">
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
