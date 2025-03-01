const mongoose = require("mongoose");

const EnrollmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  courseTitle: { type: String, required: true },
  tier: { type: String, required: true },
  enrolledAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enrollment", EnrollmentSchema);
