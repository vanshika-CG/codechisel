const express = require("express");
const User = require("../models/usermodel"); // Import Mongoose model
const authenticateToken = require("../middleware/auth"); // ✅ Import only!

const router = express.Router();

// **PROFILE ROUTE**
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Exclude password
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user profile: " + err.message });
    }
});

// **UPDATE PROFILE ROUTE**
router.put("/update", authenticateToken, async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ error: "User not found" });

        user.username = username || user.username;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({ message: "Profile updated successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Ensure this file is exported
module.exports = router;
