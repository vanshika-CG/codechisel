const express = require("express");
const mongoose = require("mongoose");
const Quiz = require("../models/quizmodelmodel");
const Submission = require("../models/Submission");

const router = express.Router();

// ✅ Quiz Submission Route
router.post("/:quizId/submit", async (req, res) => {
  try {
    const { quizId } = req.params;
    let { userId, answers } = req.body;

    console.log("📥 Received submission for quiz:", quizId);

    // ✅ Validate `quizId`
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: "Invalid quiz ID format" });
    }

    // ✅ Validate `userId` (convert to ObjectId if possible)
    if (mongoose.Types.ObjectId.isValid(userId)) {
      userId = new mongoose.Types.ObjectId(userId);
    } else {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      console.error("❌ Quiz not found");
      return res.status(404).json({ error: "Quiz not found" });
    }

    // ✅ Validate `answers` array length
    if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
      return res.status(400).json({ error: "Invalid or incomplete answers submitted" });
    }

    let score = 0;
    const gradingDetails = [];

    quiz.questions.forEach((question, index) => {
      const selectedAnswer = answers[index] || null;
      const isCorrect = question.correctAnswer === selectedAnswer;

      gradingDetails.push({
        question: question.question,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });

      if (isCorrect) score += question.points;
    });

    // ✅ Save submission using Mongoose
    const submission = new Submission({
      userId, // Now always an ObjectId
      quizId: new mongoose.Types.ObjectId(quizId),
      answers,
      score,
      gradingDetails,
      submittedAt: new Date(),
    });

    await submission.save();

    console.log("✅ Submission successful:", submission._id);

    res.status(201).json({
      message: "Submission successful",
      submissionId: submission._id,
      score,
      gradingDetails,
    });
  } catch (err) {
    console.error("❌ Submission error:", err.message);
    res.status(500).json({ error: "Failed to submit quiz", details: err.message });
  }
});

module.exports = router;
