import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import "./QuizDetails.css";

const QuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [gradingDetails, setGradingDetails] = useState(null);
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/quizzes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (timeLeft <= 0 && !quizEnded) {
      handleSubmit();
      setQuizEnded(true);
      return;
    }

    if (!quizEnded) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, quizEnded]);

  useEffect(() => {
    if (gradingDetails) {
      let calculatedScore = 0;
      quiz?.questions.forEach((q, index) => {
        if (gradingDetails?.[index]?.isCorrect) {
          calculatedScore += 10;
        }
      });
      setScore(calculatedScore);
    }
  }, [gradingDetails]);

  const handleSubmit = async () => {
    const finalAnswers = {};
    quiz?.questions.forEach((_, index) => {
      finalAnswers[index] = answers[index] || null;
    });

    try {
      const response = await fetch(`http://localhost:4000/submissions/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "65f1a2b3c4d5e6f7a8b9c0d1",
          answers: Object.values(finalAnswers),
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const result = await response.json();

      if (!result.gradingDetails) {
        console.error("No grading details received!");
        return;
      }

      let calculatedScore = 0;
      quiz.questions.forEach((q, index) => {
        if (result.gradingDetails?.[index]?.isCorrect) {
          calculatedScore += 10;
        }
      });

      setGradingDetails(result.gradingDetails);
      setScore(calculatedScore);
      setQuizEnded(true);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setScore(0);
      setQuizEnded(true);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  if (quizEnded) {
    return (
      <div className="quiz-details-container">
        <button className="back-button" onClick={() => navigate("/quiz")}>⬅ Back to Quiz List</button>

        <h1>{quiz.title}</h1>
        <h2 className="score">Your Score: {score !== null ? score : "Calculating..."}</h2>
        <div className="review-section">
          {quiz.questions.map((q, i) => (
            <div key={i} className="review-question">
              <p><strong>{q.question}</strong></p>
              <p>
                Your Answer: {answers[i] || "No Answer"}
                {gradingDetails?.[i]?.isCorrect ? " ✅" : ` ❌ (Correct: ${gradingDetails?.[i]?.correctAnswer})`}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-details-container">
      {/* Back button before submission */}
      <button className="back-button" onClick={() => navigate("/quiz")}>⬅ Back to Quiz List</button>

      <div className="sidebar">
        <h3>Questions</h3>
        <ul>
          {quiz.questions.map((q, index) => (
            <li
              key={index}
              className={index === currentQuestionIndex ? "active" : ""}
              onClick={() => !quizEnded && setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      <p className="progress-indicator">
        Question {currentQuestionIndex + 1} of {quiz.questions.length}
      </p>
      <p className="timer">Time Left: {timeLeft}s</p>

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
                    onChange={() => setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: option }))}
                    disabled={quizEnded}
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        ) : (
          <textarea
            value={answers[currentQuestionIndex] || ""}
            onChange={(e) => setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: e.target.value }))}
            disabled={quizEnded}
          />
        )}
      </div>

      <div className="navigation-buttons">
        {currentQuestionIndex > 0 && !quizEnded && (
          <button onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>
            Previous
          </button>
        )}
        {currentQuestionIndex < quiz.questions.length - 1 && !quizEnded ? (
          <button onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>
            Next
          </button>
        ) : (
          !quizEnded && <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default QuizDetails;
