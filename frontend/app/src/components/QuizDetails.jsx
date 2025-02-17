import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./QuizDetails.css";

const QuizDetails = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [gradingDetails, setGradingDetails] = useState(null);
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question index

  useEffect(() => {
    fetch(`http://localhost:4000/quizzes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch quiz: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data || !data.questions) {
          throw new Error("Invalid quiz data received");
        }
        setQuiz(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      });
  }, [id]);

  const handleOptionSelect = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitting answers:", answers);

    try {
      const response = await fetch(`http://localhost:4000/submissions/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "12345",
          answers: Object.values(answers),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit quiz: ${errorText}`);
      }

      const result = await response.json();
      console.log("Response from server:", result);

      setGradingDetails(result.gradingDetails);
      setScore(result.score);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-details-container">
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>

      <h2>Question {currentQuestionIndex + 1} of {quiz.questions.length}</h2>
      <div className="question-container">
        <p>{currentQuestion.question}</p>
        {currentQuestion.type === "multiple-choice" ? (
          <ul>
            {currentQuestion.options.map((option, i) => (
              <li key={i}>
                <label>
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleOptionSelect(option)}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <textarea
            placeholder="Write your answer here..."
            value={answers[currentQuestionIndex] || ""}
            onChange={(e) => handleOptionSelect(e.target.value)}
          />
        )}

        {gradingDetails && gradingDetails[currentQuestionIndex] && (
          <p>
            {gradingDetails[currentQuestionIndex].isCorrect ? (
              <span style={{ color: "green" }}>✔ Correct</span>
            ) : (
              <span style={{ color: "red" }}>
                ✖ Incorrect, correct answer: {gradingDetails[currentQuestionIndex].correctAnswer}
              </span>
            )}
          </p>
        )}
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="navigation-buttons">
        {currentQuestionIndex > 0 && (
          <button className="prev-button" onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>
            Previous
          </button>
        )}

        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button className="next-button" onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>
            Next
          </button>
        ) : (
          <button className="submit-button" onClick={handleSubmit}>
            Submit Answers
          </button>
        )}
      </div>

      {score !== null && <h2 className="score-display">Your Score: {score}</h2>}
    </div>
  );
};

export default QuizDetails;
