const { ObjectId } = require('mongodb');

const quizModel = {
    _id: ObjectId,
    title: String,
    description: String,
    courseId: ObjectId,
    questions: [
        {
            type: String, // "multiple-choice" or "coding"
            question: String,
            options: Array, // Only for multiple-choice
            correctAnswer: String,
            correctCode: String, // Only for coding quizzes
            points: Number
        }
    ],
    createdAt: Date
};

module.exports = quizModel;
