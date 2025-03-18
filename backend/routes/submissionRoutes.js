const express = require("express");
const mongoose = require("mongoose");
const Quiz = require("../models/quizmodelmodel");
const Submission = require("../models/Submission");
const User = require("../models/usermodel");
const Leaderboard = require("../models/leaderboardmodel"); // Import Leaderboard model

const router = express.Router();

// ✅ Quiz Submission Route
router.post("/:quizId/submit", async (req, res) => {
  try {
    const { quizId } = req.params;
    let { userId, answers } = req.body;

    console.log("📥 Received submission for quiz:", quizId);
    console.log("🔍 Received userId in body:", userId);

    // ✅ Validate quizId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ error: "Invalid quiz ID format" });
    }

    // ✅ Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }

    // ✅ Convert userId to ObjectId
    userId = new mongoose.Types.ObjectId(userId);

    // ✅ Find the quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      console.error("❌ Quiz not found");
      return res.status(404).json({ error: "Quiz not found" });
    }

    // ✅ Validate answers length matches questions length
    if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
      return res.status(400).json({ error: "Invalid or incomplete answers submitted" });
    }

    let score = 0;
    const gradingDetails = [];

    // ✅ Grade the quiz
    quiz.questions.forEach((question, index) => {
      const selectedAnswer = answers[index] || null;
      const isCorrect = question.correctAnswer === selectedAnswer;

      gradingDetails.push({
        question: question.question,
        selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
      });

      if (isCorrect) {
        score += question.points; // Add points for correct answer
      }
    });

    // ✅ Save the submission
    const submission = new Submission({
      userId,
      quizId: new mongoose.Types.ObjectId(quizId),
      answers,
      score,
      gradingDetails,
      submittedAt: new Date(),
    });

    await submission.save();

    // ✅ Update the user's score
    const user = await User.findById(userId);

    if (user) {
      user.score = (user.score || 0) + score; // Update user's score
      await user.save();
      console.log("✅ User score updated:", user.score);
    } else {
      console.error("❌ User not found while updating score");
    }

    // ✅ Update or create leaderboard entry
    let leaderboardEntry = await Leaderboard.findOne({ user: userId });

    if (!leaderboardEntry) {
      // Create a new leaderboard entry for the user
      leaderboardEntry = new Leaderboard({
        user: userId,
        username: user.username, // Populate the username from the User model
        score: score,
        quizzesSolved: 1,
      });
    } else {
      // Update existing leaderboard entry
      leaderboardEntry.score += score;
      leaderboardEntry.quizzesSolved += 1;
    }

    await leaderboardEntry.save();
    console.log("✅ Leaderboard entry updated:", leaderboardEntry);

    console.log("✅ Submission successful:", submission._id);

    res.status(201).json({
      message: "Submission successful",
      submissionId: submission._id,
      score,
      gradingDetails,
      userTotalScore: user ? user.score : 0,
    });
  } catch (err) {
    console.error("❌ Submission error:", err.message);
    res.status(500).json({ error: "Failed to submit quiz", details: err.message });
  }
});

module.exports = router;