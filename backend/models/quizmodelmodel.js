const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    questions: [
        {
            questionType: { type: String, required: true }, // ✅ Renamed `type` to `questionType`
            question: { type: String, required: true },
            options: { type: [String], required: true }, // ✅ Ensure this is an array
            correctAnswer: { type: String, required: true },
            correctCode: { type: String },
            points: { type: Number, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

// ✅ Ensure courseId is removed completely from the schema
module.exports = mongoose.model("Quiz", quizSchema);
