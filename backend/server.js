const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const { connectDB } = require("./config/db"); // MongoDB connection
require("dotenv").config(); // Load .env variables

const userRoutes = require("./routes/user");
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const leaderboardRoutes = require('./routes/leaderboard');

const app = express();
const port = process.env.PORT || 4000;

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5174",
  process.env.CLIENT_URL // Ensure this is set in .env (e.g., "https://codechisel-24.netlify.app")
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy does not allow this origin!"));
      }
    },
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, // 1-hour session expiry
  })
);

// Request Logger for Debugging
app.use((req, res, next) => {
  console.log(`📌 ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/protected", require("./routes/protected"));
app.use("/courses", require("./routes/courses"));
app.use("/content", require("./routes/content"));
app.use("/quizzes", require("./routes/quizRoutes"));
app.use("/submissions", require("./routes/submissionRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/code", require("./routes/codeExecution"));
app.use("/api/user", userRoutes);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/api/enrollments", require("./routes/enrollment"));
app.use("/api", require("./routes/chatbot"));
app.use('/api/leaderboard', leaderboardRoutes);


// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    // Log all registered routes
    console.log("\n✅ Registered Routes:");
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        console.log(`  ➜  ${Object.keys(middleware.route.methods)[0].toUpperCase()} ${middleware.route.path}`);
      } else if (middleware.name === "router") {
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
