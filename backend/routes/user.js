const express = require("express");
const bcrypt = require("bcrypt");
const { upload, cloudinary } = require("../config/cloudinaryConfig");
const User = require("../models/usermodel");
const authenticateToken = require("../middleware/auth");

const router = express.Router();

// **PROFILE ROUTE**
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            username: user.username,
            email: user.email,
            profileImage: user.profileImage || "",
            publicId: user.publicId || "",
            role: user.role,
            enrolledCourses:user.enrolledCourses,
            score:user.score    
        });

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

// **UPLOAD PROFILE PHOTO**
router.post("/upload-photo", authenticateToken, upload.single("photo"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user.profileImage = req.file.path;
        user.publicId = req.file.filename;
        await user.save();

        res.json({ imageUrl: user.profileImage, publicId: user.publicId, message: "Profile photo uploaded successfully!" });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to upload image" });
    }
});


// **DELETE PROFILE PHOTO**
router.delete("/delete-photo", authenticateToken, async (req, res) => {
    try {
        console.log("Received request body:", req.body); // Debugging

        const { publicId } = req.body;
        const userId = req.user.id; // Get user ID from token

        if (!publicId || !userId) {
            return res.status(400).json({ error: "Public ID and user ID are required" });
        }

        console.log("Deleting from Cloudinary:", publicId); // Debugging

        await cloudinary.uploader.destroy(publicId);

        // Update user in the database
        const user = await User.findByIdAndUpdate(userId, {
            $unset: { profileImage: "", publicId: "" },
        }, { new: true }); // Return updated user

        console.log("Updated User:", user); // Debugging

        res.json({ message: "Profile photo deleted successfully", user });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ error: "Server error: " + error.message });
    }
});


// **CHANGE PASSWORD ROUTE (✅ FIXED)**
router.put("/change-password", authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ error: "User not found" });

        // ✅ Check if the current password matches
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ error: "Incorrect current password" });

        // ✅ Hash new password & update
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        
        res.json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error updating password: " + error.message });
    }
});

// ✅ Ensure this file is exported
module.exports = router;
