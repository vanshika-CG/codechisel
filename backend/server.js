const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { connectDB } = require('./config/db'); // MongoDB connection
require('dotenv').config(); // Load .env variables

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Allow both ports
    credentials: true
}));


app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1-hour session expiry
}));


// Routes
app.use('/login', require('./routes/login')); // Authentication routes
app.use('/protected', require('./routes/protected')); // Protected routes
app.use('/courses', require('./routes/courses'));
app.use('/content', require('./routes/content')); // Content management routes
app.use('/quizzes', require('./routes/quizRoutes'));
app.use('/submissions', require('./routes/submissionRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/code', require('./routes/codeExecution')); // Code execution route


// Connect to MongoDB and start the server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});