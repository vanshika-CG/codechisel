import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./QuizList.css";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [leaderboard, setLeaderboard] = useState([
    { name: "JohnDoe", score: 95 },
    { name: "AliceWonder", score: 90 },
    { name: "BobSmith", score: 85 },
    { name: "EvaGreen", score: 80 },
    { name: "MikeJones", score: 75 },
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuizzes();
  }, [selectedDifficulty]);

  const fetchQuizzes = () => {
    setIsLoading(true);
    let url = "http://localhost:4000/quizzes";
    if (selectedDifficulty) {
      url += `?difficulty=${selectedDifficulty}`;
    }

    axios
      .get(url)
      .then((response) => {
        setQuizzes(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setIsLoading(false);
      });
  };

  // Filter quizzes based on search input
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="wrapper">
      <div className="content-container">
        <div className="quiz-list-container">
          <h1 className="animate-title">Available Quizzes</h1>

          {/* Search Bar */}
          <input
            type="text"
            className="search-bar"
            placeholder="Search quizzes..."
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
          <div className="quiz-cards-container">
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz, index) => (
                <div 
                  key={quiz.id} 
                  className="quiz-card"
                  style={{ 
                    animationDelay: `${index * 0.1}s` 
                  }}
                >
                  <h2>{quiz.title}</h2>
                  <p>{quiz.description}</p>
                  <p className="difficulty">Difficulty: {quiz.difficulty}</p>
                  <Link to={`/quiz/${quiz.id}`} className="take-quiz-button">
                    Take Quiz
                  </Link>
                </div>
              ))
            ) : (
              <p className="no-results">No quizzes found.</p>
            )}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="leaderboard-container">
          <h2 className="leaderboard-title">Top Performers</h2>
          <div className="leaderboard-list">
            {leaderboard.map((user, index) => (
              <div 
                key={index} 
                className="leaderboard-item"
                style={{ 
                  animationDelay: `${index * 0.1}s` 
                }}
              >
                <div className="rank">{index + 1}</div>
                <div className="user-name">{user.name}</div>
                <div className="score">{user.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizList;