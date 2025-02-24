const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel'); // Use the correct User Model
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// POST: Login a user
router.post("/login", async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        
        // Find user by email or username
        const user = await User.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }]
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, "your_secret_key", { expiresIn: "1h" });

        res.json({ token, username: user.username, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
