const express = require("express");
const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const router = express.Router();

// ✅ Fix the endpoint to match frontend request
router.post("/:quizId/submit", async (req, res) => {
  try {
    const db = getDB();
    const { quizId } = req.params;
    const { userId, answers } = req.body;

    console.log("Received submission for quiz:", quizId);
    console.log("Answers received:", answers);

    // ✅ Convert `quizId` to `ObjectId`
    const quiz = await db.collection("quizzes").findOne({ _id: new ObjectId(quizId) });

    if (!quiz) {
      console.error("Quiz not found in database");
      return res.status(404).json({ error: "Quiz not found" });
    }

    let score = 0;
    const gradingDetails = [];

    quiz.questions.forEach((question, index) => {
      const isCorrect = question.correctAnswer === answers[index];
      gradingDetails.push({
        question: question.question,
        selectedAnswer: answers[index],
        correctAnswer: question.correctAnswer,
        isCorrect,
      });
      if (isCorrect) score += question.points;
    });

    // ✅ Save submission to database
    const result = await db.collection("submissions").insertOne({
      userId,
      quizId,
      answers,
      score,
      gradingDetails,
      submittedAt: new Date(),
    });

    console.log("Submission successful:", result.insertedId);

    res.status(201).json({
      message: "Submission successful",
      submissionId: result.insertedId,
      score,
      gradingDetails,
    });
  } catch (err) {
    console.error("Submission error:", err.message);
    res.status(500).json({ error: "Failed to submit quiz", details: err.message });
  }
});

module.exports = router;
