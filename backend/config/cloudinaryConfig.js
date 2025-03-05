const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define storage for multer using Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "profile_photos", // Folder name in Cloudinary
        allowed_formats: ["jpg", "png", "jpeg"], // Allowed formats
        // public_id: `user_${req.user.id}`, // Store image with user ID

    },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
