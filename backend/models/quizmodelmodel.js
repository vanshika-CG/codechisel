const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    questions: [
        {
            type: { type: String, required: true },
            question: { type: String, required: true },
            options: { type: [String], required: true },
            correctAnswer: { type: String, required: true },
            correctCode: { type: String },
            points: { type: Number, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Quiz", quizSchema);
