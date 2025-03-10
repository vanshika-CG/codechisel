import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./QuizList.css";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState(""); // New state for difficulty filter
  const [loading, setLoading] = useState(true); // Loader state
  const [error, setError] = useState(null); // Error state


  useEffect(() => {
    fetchQuizzes();
  }, [selectedDifficulty]); // Fetch quizzes when difficulty changes
  const fetchQuizzes = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching
    let url = "http://localhost:4000/quizzes";

    if (selectedDifficulty) {
      url += `?difficulty=${selectedDifficulty}`;
    }

    try {
      const response = await axios.get(url);
      setQuizzes(response.data);
    } catch (err) {
      setError("Failed to fetch quizzes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

               {/* Loader */}
        {loading && (
          <div className="loader-container">
            <div className="loader">
              <div className="spinner"></div>
              <span>Loading quizzes...</span>
            </div>
          </div>
        )}
        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Quiz List */}
        {!loading && !error && filteredQuizzes.length > 0 ? (
          filteredQuizzes.map((quiz) => (
            <div key={quiz._id} className="quiz-card">
            <p className={`difficulty ${quiz.difficulty.toLowerCase()}`}>
              {quiz.difficulty}
            </p>
            <h2>{quiz.title}</h2>
            <p>{quiz.description}</p>
            <Link to={`/quiz/${quiz._id}`} className="take-quiz-button">
              Take Quiz
            </Link>
          </div>          
          ))
        ) : (
          !loading && !error && <p className="no-results">No quizzes found.</p>
        )}
      </div>
    </div>
  );
};

export default QuizList;
