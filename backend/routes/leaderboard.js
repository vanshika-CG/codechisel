const express = require('express');
const router = express.Router();
const Leaderboard = require('../models/leaderboardmodel');
const User = require('../models/usermodel'); // Import the User model
const authenticateToken = require('../middleware/auth');

// PUBLIC: Get the complete leaderboard (no filter)
router.get('/', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate({
        path: 'user',
        select: 'username profileImage score', // Include the score field from the User model
      })
      .sort({ score: -1 }); // Sort by score in descending order

    console.log('🔍 Leaderboard data:', leaderboard); // Debugging log
    res.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Failed to fetch leaderboard', error: error.message });
  }
});

module.exports = router;