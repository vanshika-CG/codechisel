const express = require('express');
const jwt = require('jsonwebtoken');
const { usersCollection } = require('../models/usermodel');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: "Access Denied" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid Token" });
        req.user = user;
        next();
    });
};

// GET: Fetch User Profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await usersCollection().findOne({ _id: req.user.id }, { projection: { password: 0 } });
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user profile: " + err.message });
    }
});

module.exports = router;
