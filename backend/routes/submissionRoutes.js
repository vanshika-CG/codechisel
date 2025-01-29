const express = require('express');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Submit Quiz Answers
router.post('/:quizId/submit', async (req, res) => {
    try {
        const db = getDB();
        const { quizId } = req.params;
        const { userId, answers } = req.body;

        const quiz = await db.collection("quizzes").findOne({ _id: new ObjectId(quizId) });
        if (!quiz) return res.status(404).json({ error: "Quiz not found" });

        let score = 0;
        const gradingDetails = [];

        quiz.questions.forEach((question, index) => {
            const isCorrect = question.correctAnswer === answers[index];
            gradingDetails.push({ question: question.question, correct: isCorrect });
            if (isCorrect) score += question.points;
        });

        const result = await db.collection("submissions").insertOne({
            userId,
            quizId,
            answers,
            score,
            gradingDetails,
            submittedAt: new Date()
        });

        res.status(201).json({ message: "Submission successful", submissionId: result.insertedId, score });
    } catch (err) {
        res.status(500).json({ error: "Failed to submit quiz", details: err.message });
    }
});

module.exports = router;
