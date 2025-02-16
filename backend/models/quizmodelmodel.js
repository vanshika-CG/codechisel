const { ObjectId } = require('mongodb');

const quizModel = {
    _id: ObjectId,
    title: String,
    description: String,
    difficulty: String, // NEW FIELD: "Easy", "Medium", "Hard"
    courseId: ObjectId,
    questions: [
        {
            type: String,
            question: String,
            options: Array, 
            correctAnswer: String,
            correctCode: String, 
            points: Number
        }
    ],
    createdAt: Date
};


module.exports = quizModel;
