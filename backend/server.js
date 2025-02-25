const express = require('express');
const mongoose = require("mongoose");
const session = require('express-session');
const cors = require('cors');
const { connectDB } = require('./config/db'); // MongoDB connection
require('dotenv').config(); // Load .env variables

const userRoutes = require('./routes/user');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');  

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
app.use('/api/profile', require('./routes/user'));
app.use('/api/enrollments', require('./routes/enrollment'));

// Connect to MongoDB and start the server
connectDB()
    .then(() => {
        // Log all registered routes
        console.log("\n✅ Registered Routes:");
        app._router.stack.forEach((middleware) => {
            if (middleware.route) {
                console.log(`  ➜  ${Object.keys(middleware.route.methods)[0].toUpperCase()} ${middleware.route.path}`);
            } else if (middleware.name === 'router') {
                middleware.handle.stack.forEach((subMiddleware) => {
                    if (subMiddleware.route) {
                        console.log(`  ➜  ${Object.keys(subMiddleware.route.methods)[0].toUpperCase()} ${subMiddleware.route.path}`);
                    }
                });
            }
        });

        app.listen(port, () => {
            console.log(`\n🚀 Server running at: http://localhost:${port}\n`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MongoDB:", err.message);
        process.exit(1); // Exit the process on DB connection failure
    });