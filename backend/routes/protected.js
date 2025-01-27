const express = require('express');
const router = express.Router();

// GET: Protected route
router.get('/', (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send("Access denied");
    }
    res.status(200).send(`Welcome, ${req.session.username}`);
});

module.exports = router;
