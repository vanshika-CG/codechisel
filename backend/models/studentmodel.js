const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },  // Hashed
    role: { type: String, enum: ["student", "admin"], required: true },
    createdAt: { type: Date, default: Date.now },

    // ✅ Add this field for the leaderboard
    score: { type: Number, default: 0 }         // Student's score for ranking
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;