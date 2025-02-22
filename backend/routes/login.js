const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usersCollection } = require('../models/usermodel');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// POST: Login a user
router.post('/', async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        // Find user in database
        const user = await usersCollection().findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid username/email or password" });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username/email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ token, username: user.username });
    } catch (err) {
        res.status(500).json({ message: "Error logging in user: " + err.message });
    }
});

module.exports = router;
