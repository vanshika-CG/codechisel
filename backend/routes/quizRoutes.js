const express = require('express');
const { getDB } = require('../config/db');
const { ObjectId } = require('mongodb');

const router = express.Router();

// Create a Quiz
router.post('/', async (req, res) => {
    try {
        const db = getDB();
        const { title, description, courseId, questions } = req.body;
        const result = await db.collection("quizzes").insertOne({ title, description, courseId, questions, createdAt: new Date() });
        res.status(201).json({ message: "Quiz created", quizId: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: "Failed to create quiz", details: err.message });
    }
});

// Get all Quizzes
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        const quizzes = await db.collection("quizzes").find().toArray();
        res.status(200).json(quizzes);
    } catch (err) {
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
