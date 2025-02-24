const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth'); // Import JWT-based authentication

// ✅ Protected route that requires authentication
router.get('/', protect, (req, res) => {
    res.status(200).send(`Welcome, ${req.user.username}`); // `req.user` is set by `protect` middleware
});

module.exports = router;
