const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb'); // Import ObjectId for validation
const courses = require('../models/coursesmodel');

// POST: Add a new course
router.post('/add', async (req, res) => {
    try {
        const { title, description, author, duration } = req.body;

        if (!title || !description || !author || !duration) {
            return res.status(400).send("All fields are required.");
        }

        const result = await courses().insertOne({ title, description, author, duration });
        res.status(201).send(`Course added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding course: " + err.message);
    }
});

// GET: Fetch all courses
router.get('/all', async (req, res) => {
    try {
        const allCourses = await courses().find({}).toArray();
        res.status(200).json(allCourses);
    } catch (err) {
        res.status(500).send("Error fetching courses: " + err.message);
    }
});

// PUT: Update a course
router.put('/update/:id', async (req, res) => {
    try {
        const courseId = req.params.id;
        const { title, description, author, duration } = req.body;

        // Validate if the ID is a valid ObjectId
        if (!ObjectId.isValid(courseId)) {
            return res.status(400).send("Invalid course ID.");
        }

        const result = await courses().updateOne(
            { _id: new ObjectId(courseId) },
            { $set: { title, description, author, duration } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send("Course not found or nothing to update.");
        }

        res.status(200).send("Course updated successfully.");
    } catch (err) {
        res.status(500).send("Error updating course: " + err.message);
    }
});

// DELETE: Delete a course
router.delete('/delete/:id', async (req, res) => {
    try {
        const courseId = req.params.id;

        // Validate if the ID is a valid ObjectId
        if (!ObjectId.isValid(courseId)) {
            return res.status(400).send("Invalid course ID.");
        }

        const result = await courses().deleteOne({ _id: new ObjectId(courseId) });

        if (result.deletedCount === 0) {
            return res.status(404).send("Course not found.");
        }

        res.status(200).send("Course deleted successfully.");
    } catch (err) {
        res.status(500).send("Error deleting course: " + err.message);
    }
});

module.exports = router;
