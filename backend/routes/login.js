const express = require('express');
const bcrypt = require('bcrypt');
const { usersCollection } = require('../models/usermodel'); // Import usersCollection
const router = express.Router();

// POST: Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await usersCollection().findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).send("Username or Email already exists");
        }

        // Hash password and save user
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await usersCollection().insertOne({ username, email, password: hashedPassword });

        res.status(201).send(`User registered with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error registering user: " + err.message);
    }
});

// POST: Login a user
router.post('/login', async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        // Find the user by username or email
        const user = await usersCollection().findOne({
            $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
        });

        if (!user) {
            return res.status(400).send("Invalid username/email or password");
        }

        // Compare the password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send("Invalid username/email or password");
        }

        // Store user session
        req.session.userId = user._id;
        req.session.username = user.username;

        res.status(200).send("Login successful");
    } catch (err) {
        res.status(500).send("Error logging in user: " + err.message);
    }
});

// POST: Logout a user
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).send("Error logging out");
        res.status(200).send("Logout successful");
    });
});

module.exports = router;
