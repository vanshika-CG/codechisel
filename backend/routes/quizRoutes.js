const express = require('express');
const Quiz = require('../models/quizmodelmodel');
const User = require('../models/usermodel.js');
const Leaderboard = require('../models/leaderboardmodel');
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

router.post('/submit-quiz', async (req, res) => {
    const { userId, scoreEarned } = req.body;

    console.log("➡️  Incoming submit-quiz request");
    console.log("🧑‍💻 userId:", userId);
    console.log("🎯 scoreEarned:", scoreEarned);

    try {
        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            console.log("❌ User not found");
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("✅ User found:", user.username);

        // Find or create leaderboard entry
        let leaderboardEntry = await Leaderboard.findOne({ user: userId });

        if (!leaderboardEntry) {
            console.log("ℹ️  No leaderboard entry, creating new one...");
            leaderboardEntry = new Leaderboard({
                user: userId,
                score: scoreEarned,
                quizzesSolved: 1
            });
        } else {
            console.log("ℹ️  Leaderboard entry found, updating...");
            leaderboardEntry.score += scoreEarned;
            leaderboardEntry.quizzesSolved += 1;
        }

        // Save the leaderboard entry
        await leaderboardEntry.save();

        res.status(200).json({
            message: 'Score updated',
            leaderboardEntry
        });

    } catch (error) {
        console.error("🔥 Error in submit-quiz:", error);
        res.status(500).json({
            message: 'Error updating score and leaderboard',
            error: error.message // This will show the actual error string
        });
    }
});


module.exports = router;
