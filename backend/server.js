const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { connectDB } = require('./config/db'); // MongoDB connection
require('dotenv').config(); // Load .env variables
const userRoutes = require('./routes/user');
const app = express();
const port = process.env.PORT || 4000;

const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');  

// Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5176"], // Allow both ports
    credentials: true
}));


app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } // 1-hour session expiry
}));


// Routes
app.use('/protected', require('./routes/protected')); // Protected routes
app.use('/courses', require('./routes/courses'));
app.use('/content', require('./routes/content')); // Content management routes
app.use('/quizzes', require('./routes/quizRoutes'));
app.use('/submissions', require('./routes/submissionRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/code', require('./routes/codeExecution')); // Code execution route
app.use('/api/user', userRoutes);
app.use('/login', loginRoute);
app.use('/register', registerRoute); 


// Connect to MongoDB and start the server
connectDB().then(() => {

    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
            console.log(`Registered Route: ${r.route.path}`);
        }
    });
    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});