const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/chatbot", async (req, res) => {
    try {
        const { message } = req.body;
        console.log("📩 Received message:", message);

        const response = await axios.post(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
            { inputs: message },
            { headers: { Authorization: `Bearer ${process.env.HF_API_KEY}` } }
        );

        console.log("🤖 API Response:", response.data); // Debugging

        // Fix: Check if response is an array and extract the text
        if (Array.isArray(response.data) && response.data.length > 0 && response.data[0].generated_text) {
            res.json({ response: response.data[0].generated_text });
        } else {
            throw new Error("Invalid response structure from Hugging Face API");
        }

    } catch (error) {
        console.error("❌ Chatbot Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Chatbot is unavailable. Check API logs." });
    }
});

module.exports = router;
