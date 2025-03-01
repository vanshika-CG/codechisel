const express = require("express");
const Enrollment = require("../models/enrollmentModel");
const Course = require("../models/coursesmodel");
const authMiddleware = require("../middleware/auth"); // Ensure user is logged in
const router = express.Router();

// POST: Enroll a user in a course
router.post("/enroll", authMiddleware, async (req, res) => {
  try {
    const { courseId, tier } = req.body;
    const userId = req.user._id;
    const username = req.user.username;
    const email = req.user.email;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Check if the user is already enrolled
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) return res.status(400).json({ error: "Already enrolled" });

    // Save enrollment
    const enrollment = new Enrollment({
      userId,
      username,
      email,
      courseId,
      courseTitle: course.title,
      tier
    });

    await enrollment.save();
    res.json({ message: "Enrollment successful", enrollment });
  } catch (error) {
    console.error("❌ Enrollment error:", error);
    res.status(500).json({ error: "Failed to enroll" });
  }
});

// GET: Fetch enrolled courses for the logged-in user
router.get("/my-courses", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find user's enrollments
    const enrolledCourses = await Enrollment.find({ userId })
    .populate("courseId")
    .lean(); // Convert to plain objects
  
  // Remove any enrollments with a missing courseId
  const validEnrollments = enrolledCourses.filter((enrollment) => enrollment.courseId);
  
  res.json(validEnrollments);
  
  } catch (error) {
    console.error("❌ Fetch my courses error:", error);
    res.status(500).json({ error: "Failed to fetch enrolled courses" });
  }
});

module.exports = router;
