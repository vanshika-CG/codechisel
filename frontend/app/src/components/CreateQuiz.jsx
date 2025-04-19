// CreateQuiz.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "", points: 10 }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    if (name.startsWith("question")) {
      const updatedQuestions = [...quizData.questions];
      updatedQuestions[index][name.split(".")[1]] = value;
      setQuizData({ ...quizData, questions: updatedQuestions });
    } else {
      setQuizData({ ...quizData, [name]: value });
    }
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, { question: "", options: ["", "", "", ""], correctAnswer: "", points: 10 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/quizzes/quizzes",
        quizData,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      alert("Quiz created successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create quiz: " + err.response?.data?.error);
    }
  };

  if (localStorage.getItem("role") !== "teacher") {
    navigate("/dashboard");
    return null;
  }

  return (
    <div>
      <h1>Create a Quiz</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={quizData.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={quizData.description} onChange={handleChange} />
        <select name="difficulty" value={quizData.difficulty} onChange={handleChange}>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        {quizData.questions.map((q, i) => (
          <div key={i}>
            <input
              name={`question.question`}
              placeholder="Question"
              value={q.question}
              onChange={(e) => handleChange(e, i)}
              required
            />
            {q.options.map((opt, j) => (
              <input
                key={j}
                name={`question.options.${j}`}
                placeholder={`Option ${j + 1}`}
                value={opt}
                onChange={(e) => {
                  const updatedQuestions = [...quizData.questions];
                  updatedQuestions[i].options[j] = e.target.value;
                  setQuizData({ ...quizData, questions: updatedQuestions });
                }}
                required
              />
            ))}
            <input
              name={`question.correctAnswer`}
              placeholder="Correct Answer"
              value={q.correctAnswer}
              onChange={(e) => handleChange(e, i)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Create Quiz</button>
      </form>
    </div>
  );
};

export default CreateQuiz;