const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollmentModel');
const { protect } = require('../middleware/auth'); // Ensure user authentication

// POST: Enroll a user in a course
router.post('/enroll', protect, async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user.id;

    try {
        // Check if user is already enrolled
        const existingEnrollment = await Enrollment.findOne({ userId, courseId });
        if (existingEnrollment) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        // Create new enrollment
        const enrollment = new Enrollment({ userId, courseId });
        await enrollment.save();

        res.status(201).json({ message: "Enrollment successful", enrollment });
    } catch (error) {
        res.status(500).json({ message: "Error enrolling user", error });
    }
});

// GET: Fetch all courses a user is enrolled in
router.get('/my-courses', protect, async (req, res) => {
    try {
        const userId = req.user.id;
        const enrollments = await Enrollment.find({ userId }).populate('courseId');
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching enrolled courses", error });
    }
});

// PUT: Update progress in a course
router.put('/update-progress/:id', protect, async (req, res) => {
    const { progress } = req.body;
    const enrollmentId = req.params.id;

    try {
        const enrollment = await Enrollment.findById(enrollmentId);
        if (!enrollment) {
            return res.status(404).json({ message: "Enrollment not found" });
        }

        enrollment.progress = progress;
        enrollment.completed = progress >= 100;
        await enrollment.save();

        res.status(200).json({ message: "Progress updated", enrollment });
    } catch (error) {
        res.status(500).json({ message: "Error updating progress", error });
    }
});

module.exports = router;
