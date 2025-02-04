import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './QuizList.css'

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/quizzes") // ✅ Correct backend URL
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  }, []);

  return (
    <div className="quiz-list-container">
      <h1>Available Quizzes</h1>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className="quiz-card">
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
          <Link to={`/quiz/${quiz._id}`}>Take Quiz</Link> {/* ✅ Fixed template literal */}
        </div>
      ))}
    </div>
  );
};

export default QuizList;
