const express = require('express');
const router = express.Router();
const Course = require('../models/coursesmodel'); // Import the Mongoose model

// 📌 POST: Add a new course
router.post('/addCourses', async (req, res) => {
    try {
        const exploreCourses = [
            { title: "C Programming", icon: "C", description: "Master C programming fundamentals and memory management." },
            { title: "SQL", icon: "📊", description: "Learn database management and SQL query optimization." },
            { title: "C++", icon: "C++", description: "Advanced programming with C++ and object-oriented concepts." },
            { title: "Java Basic to Java", icon: "☕", description: "Comprehensive Java programming from basics to advanced." },
            { title: "ASP.NET Core", icon: "🌐", description: "Build modern web applications with ASP.NET Core." },
            { title: "C#", icon: "C#", description: "Learn C# programming and .NET framework development." },
            { title: "Python", icon: "🐍", description: "Advanced Python concepts and application development." },
            { title: "Angular", icon: "🅰️", description: "Build dynamic web applications with Angular framework." },
            { title: "React", icon: "⚛️", description: "Create modern user interfaces with React components." }
        ];

        await Course.insertMany(exploreCourses);
        res.status(201).json({ message: "Courses added successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 🟢 GET: Fetch All Courses
router.get('/all', async (req, res) => {
    try {
        console.log("📌 Fetching courses...");
        const courses = await Course.find(); // Fetch courses

        if (!courses || courses.length === 0) {
            console.log("⚠️ No courses found.");
            return res.status(404).json({ error: "No courses available" });
        }

        console.log("✅ Courses fetched:", courses);
        res.status(200).json(courses);
    } catch (error) {
        console.error("❌ Error fetching courses:", error.message);
        res.status(500).json({ error: "Failed to fetch courses", details: error.message });
    }
});

  

// 📌 PUT: Update a course
router.put('/update/:id', async (req, res) => {
    try {
        const { title, description, author, duration } = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            { title, description, author, duration },
            { new: true, runValidators: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ error: "Course not found." });
        }

        res.status(200).json({ message: "Course updated successfully!", course: updatedCourse });
    } catch (error) {
        res.status(500).json({ error: "Error updating course: " + error.message });
    }
});

// 📌 DELETE: Delete a course
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found." });
        }

        res.status(200).json({ message: "Course deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting course: " + error.message });
    }
});

module.exports = router;
