// teacherroutes.js
const express = require('express');
const Quiz = require('../models/quizmodel');
const { authMiddleware, roleMiddleware } = require('../middleware/auth'); // Correct import
const router = express.Router();

// Get all quizzes created by the teacher
router.get('/my-quizzes', authMiddleware, roleMiddleware(['teacher', 'admin']), async (req, res) => {
    try {
        const quizzes = await Quiz.find({ createdBy: req.user._id });
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch quizzes", details: err.message });
    }
});

module.exports = router;