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
  
  const handleOptionSelect = (questionIndex, option) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitting answers:", answers); // Debugging
  
    try {
      // ✅ Ensure correct API endpoint
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

  return (
    <div className="quiz-details-container">
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>


      <h2>Questions</h2>
      {quiz.questions.map((q, index) => (
       <div key={index} className="question-container">
          <p>{q.question}</p>
          {q.type === "multiple-choice" ? (
            <ul>
              {q.options.map((option, i) => (
                <li key={i}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`} // ✅ Fixed radio button name
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleOptionSelect(index, option)}
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <textarea
              placeholder="Write your answer here..."
              value={answers[index] || ""}
              onChange={(e) => handleOptionSelect(index, e.target.value)}
            />
          )}

          {/* Show feedback after submission */}
          {gradingDetails && gradingDetails[index] && (
            <p>
              {gradingDetails[index].isCorrect ? (
                <span style={{ color: "green" }}>✔ Correct</span>
              ) : (
                <span style={{ color: "red" }}>
                  ✖ Incorrect, correct answer: {gradingDetails[index].correctAnswer}
                </span>
              )}
            </p>
          )}
        </div>
      ))}

<button className="submit-button" onClick={handleSubmit}>Submit Answers</button>

{score !== null && <h2 className="score-display">Your Score: {score}</h2>}    </div>
  );
};

export default QuizDetails;
