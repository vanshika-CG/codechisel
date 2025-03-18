import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./QuizDetails.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QuizDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [gradingDetails, setGradingDetails] = useState(null);
  const [score, setScore] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [quizEnded, setQuizEnded] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [finalizedAnswers, setFinalizedAnswers] = useState({});

  // Fetch userId from localStorage or authentication context
  const userId = localStorage.getItem("userId"); // Assuming you store userId in localStorage after login

  // ✅ Tab switch detection & warning logic
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && !quizEnded) {
        setTabSwitchCount((prevCount) => {
          const newCount = prevCount + 1;

          if (newCount === 1 || newCount === 2) {
            toast.warn(`⚠️ Warning: You've switched tabs or minimized the window (${newCount}/3)!`, {
              position: 'top-center',
              autoClose: 3000,
            });
          }

          if (newCount === 3) {
            toast.error("🚫 You've switched tabs too many times! Submitting quiz...", {
              position: 'top-center',
              autoClose: 3000,
            });
            handleSubmit();
            setQuizEnded(true);
          }

          return newCount;
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [quizEnded]);

  // ✅ Fetch quiz data
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

  // ✅ Countdown timer
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

  // ✅ Calculate score after grading
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

  // ✅ Submit quiz
  const handleSubmit = async () => {
    if (!userId) {
      console.error("❌ User ID not found. Please log in.");
      return;
    }

    const finalAnswers = {};
    quiz?.questions.forEach((_, index) => {
      finalAnswers[index] = answers[index] || null;
    });

    // ✅ Save the answers at submission time
    setFinalizedAnswers(finalAnswers);

    try {
      const response = await fetch(`http://localhost:4000/submissions/${id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId, // Use the actual userId
          username: "Krish25",  // ✅ Add your username here
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

      // ✅ Grading details and quiz ended
      setGradingDetails(result.gradingDetails);
      setQuizEnded(true);

      // ✅ Calculate score
      let calculatedScore = 0;
      quiz.questions.forEach((q, index) => {
        if (result.gradingDetails?.[index]?.isCorrect) {
          calculatedScore += 10;
        }
      });

      setScore(calculatedScore);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setScore(0);
      setQuizEnded(true);
    }
  };

  // ✅ Loading or no quiz found states
  if (loading) return <p>Loading...</p>;
  if (!quiz) return <p>Quiz not found.</p>;

  // ✅ Quiz review after submission
  if (quizEnded) {
    return (
      <div className="quiz-details-container">
        <ToastContainer />

        <button className="back-button" onClick={() => navigate("/quiz")}>
          ⬅ Back to Quiz List
        </button>

        <h1>{quiz.title}</h1>
        <h2 className="score">Your Score: {score !== null ? score : "Calculating..."}</h2>
        <div className="review-section">
          {quiz.questions.map((q, i) => (
            <div key={i} className="review-question">
              <p><strong>{q.question}</strong></p>
              <p>
                Your Answer: {answers[i] || "No Answer"}
                {gradingDetails?.[i]?.isCorrect
                  ? " ✅"
                  : ` ❌ (Correct: ${quiz.questions[i].correctAnswer})`}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ✅ Quiz in progress
  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="quiz-details-container">
      <ToastContainer />

      <button className="back-button" onClick={() => navigate("/quiz")}>
        ⬅ Back to Quiz List
      </button>

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
        {currentQuestion.questionType === "multiple-choice" ? (
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
          !quizEnded && (
            <button onClick={handleSubmit}>
              Submit
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default QuizDetails;