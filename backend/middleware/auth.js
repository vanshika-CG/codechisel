const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    console.log("Authorization Header:", authHeader);

    if (!authHeader) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    if (!token) {
      return res.status(401).json({ error: "Invalid token format." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); // Debugging log

    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) {
      return res.status(401).json({ error: "User not found." });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired. Please log in again." });
    }

    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
