const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth'); // ✅ Fix import

// ✅ Protected route that requires authentication
router.get('/', authMiddleware, (req, res) => {
    res.status(200).send(`Welcome, ${req.user.username}`);
});

// ✅ Export the router (not the middleware)
module.exports = router;
