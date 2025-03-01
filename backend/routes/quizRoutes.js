const express = require('express');
const Quiz = require('../models/quizmodelmodel');

const router = express.Router();

// Create a Quiz
router.post('/quizzes', async (req, res) => {
    try {
        const { title, description, difficulty, courseId, questions } = req.body;

        const newQuiz = new Quiz({
            title,
            description,
            difficulty,
            courseId,
            questions
        });

        await newQuiz.save();
        res.status(201).json({ message: "Quiz created", quizId: newQuiz._id });
    } catch (err) {
        res.status(500).json({ error: "Failed to create quiz", details: err.message });
    }
});

// Get all Quizzes
router.get('/', async (req, res) => {
    try {
        console.log("🔍 Fetching quizzes...");
        const difficulty = req.query.difficulty;
        const query = difficulty ? { difficulty } : {};
        const quizzes = await Quiz.find(query);
        console.log("✅ Quizzes fetched:", quizzes.length);
        res.status(200).json(quizzes);
    } catch (err) {
        console.error("❌ Error fetching quizzes:", err.message);
        res.status(500).json({ error: "Failed to fetch quizzes", details: err.message });
    }
});

// Get a Quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ error: "Quiz not found" });
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch quiz", details: err.message });
    }
});

module.exports = router;
