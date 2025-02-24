const express = require('express');
const router = express.Router();
const User = require('../models/usermodel'); // Adjust path as needed
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Route
router.post("/", async (req, res) => {
    try {
        const { username, email, password, role = "student" } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({ username, email, password: hashedPassword, role });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
