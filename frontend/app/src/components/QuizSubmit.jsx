import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizSubmit = () => {
  const { id } = useParams();
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  // Fetch userId from localStorage or authentication context
  const userId = localStorage.getItem("userId"); // Assuming you store userId in localStorage after login

  const handleChange = (qIndex, value) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const handleSubmit = () => {
    if (!userId) {
      console.error("❌ User ID not found. Please log in.");
      return;
    }

    axios.post(`http://localhost:4000/quizzes/${id}/submit`, {
      userId, // Use the actual userId
      answers: Object.values(answers),
    })
      .then((response) => setScore(response.data.score))
      .catch((error) => console.error("Error submitting quiz:", error));
  };

  return (
    <div>
      <h1>Submit Quiz</h1>
      {Object.keys(answers).map((qIndex) => (
        <div key={qIndex}>
          <input
            type="text"
            placeholder="Your answer"
            onChange={(e) => handleChange(qIndex, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <h2>Your Score: {score}</h2>}
    </div>
  );
};

export default QuizSubmit;