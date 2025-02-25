const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel'); // Use the correct Mongoose User Model
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// POST: Login a user
router.post("/", async (req, res) => {
    try {
        console.log("🔍 Login request received");

        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) {
            return res.status(400).json({ error: "Email/Username and password are required" });
        }

        // Find the user by email or username using Mongoose
        const user = await User.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful", token, username: user.username });
    } catch (err) {
        console.error("❌ Error in login:", err.message);
        res.status(500).json({ error: "Login failed", details: err.message });
    }
});

module.exports = router;
