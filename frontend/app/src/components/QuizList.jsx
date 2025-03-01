import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./QuizList.css";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(""); // New state for difficulty filter

  useEffect(() => {
    fetchQuizzes();
  }, [selectedDifficulty]); // Fetch quizzes when difficulty changes

  const fetchQuizzes = () => {
    let url = "http://localhost:4000/quizzes";
    if (selectedDifficulty) {
      url += `?difficulty=${selectedDifficulty}`;
    }

    axios
      .get(url)
      .then((response) => setQuizzes(response.data))
      .catch((error) => console.error("Error fetching quizzes:", error));
  };

  // Filter quizzes based on search input
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wrapper">
      <div className="quiz-list-container">
        <h1>Available Quizzes</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search quizzes..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Difficulty Filter */}
        <div className="difficulty-buttons">
          {["", "Easy", "Medium", "Hard"].map((level) => (
            <button
              key={level}
              className={selectedDifficulty === level ? "active" : ""}
              onClick={() => setSelectedDifficulty(level)}
            >
              {level || "All"}
            </button>
          ))}
        </div>

        {/* Quiz List */}
        {filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
              <h2>{quiz.title}</h2>
              <p>{quiz.description}</p>
              <p className="difficulty">Difficulty: {quiz.difficulty}</p>
              <Link to={`/quiz/${quiz._id}`} className="take-quiz-button">
                Take Quiz
              </Link>
            </div>
          ))
        ) : (
          <p className="no-results">No quizzes found.</p>
        )}
      </div>
    </div>
  );
};

export default QuizList;
