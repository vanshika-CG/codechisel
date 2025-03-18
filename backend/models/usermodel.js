const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' }], // Store enrollments
    
    // ✅ Add these fields to store profile photo
    profileImage: { type: String, default: "" },  // Cloudinary URL
    publicId: { type: String, default: "" },      // Cloudinary Image Public ID

    // ✅ Add this field for the leaderboard
    score: { type: Number, default: 0 }           // User's score for ranking
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
