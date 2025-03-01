const mongoose = require("mongoose");

const gradingDetailSchema = new mongoose.Schema({
  question: String,
  selectedAnswer: String,
  correctAnswer: String,
  isCorrect: Boolean,
});

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  quizId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Quiz" },
  answers: { type: [String], required: true },
  score: { type: Number, required: true },
  gradingDetails: { type: [gradingDetailSchema], required: true },
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", submissionSchema);
