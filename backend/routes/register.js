const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usersCollection } = require('../models/usermodel');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// POST: Register a new user
router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await usersCollection().findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const newUser = {
            username,
            email,
            password: hashedPassword,
            role: "student",
            createdAt: new Date(),
        };

        await usersCollection().insertOne(newUser);

        // Generate JWT Token
        const token = jwt.sign({ id: newUser._id, username: newUser.username }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: "User registered successfully", token });
    } catch (err) {
        res.status(500).json({ message: "Error registering user: " + err.message });
    }
});

module.exports = router;
