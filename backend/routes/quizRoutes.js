const express = require('express');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Create a Quiz
router.post('/quizzes', async (req, res) => {
    try {
        const db = getDB();
        const { title, description, difficulty, courseId, questions } = req.body;

        // ✅ Validate difficulty before inserting
        const validDifficulties = ["Easy", "Medium", "Hard"];
        if (!validDifficulties.includes(difficulty)) {
            return res.status(400).json({ error: "Invalid difficulty level. Use Easy, Medium, or Hard." });
        }

        const result = await db.collection("quizzes").insertOne({
            title,
            description,
            difficulty, // ✅ Make sure difficulty is stored
            courseId,
            questions,
            createdAt: new Date()
        });

        res.status(201).json({ message: "Quiz created", quizId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: "Failed to create quiz", details: err.message });
    }
});


// Get all Quizzes
// Get all Quizzes
router.get('/', async (req, res) => {
    try {
        console.log("🔍 Fetching quizzes..."); // Debugging log
        const db = getDB();
        const difficulty = req.query.difficulty;

        let query = {};
        if (difficulty) {
            query.difficulty = difficulty;
        }

        const quizzes = await db.collection("quizzes").find(query).toArray();
        console.log("✅ Quizzes fetched:", quizzes.length); // Debugging log
        res.status(200).json(quizzes);
    } catch (err) {
        console.error("❌ Error fetching quizzes:", err.message);
        res.status(500).json({ error: "Failed to fetch quizzes", details: err.message });
    }
});



// Get a Quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const db = getDB();
        const quiz = await db.collection("quizzes").findOne({ _id: new ObjectId(req.params.id) });
        if (!quiz) return res.status(404).json({ error: "Quiz not found" });
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch quiz", details: err.message });
    }
});

module.exports = router;
