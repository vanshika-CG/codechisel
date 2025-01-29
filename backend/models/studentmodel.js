const { ObjectId } = require('mongodb');

const userModel = {
    _id: ObjectId,
    username: String,
    password: String,  // Hashed
    role: String, // "student" or "admin"
    createdAt: Date
};

module.exports = userModel;
