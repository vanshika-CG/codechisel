const express = require("express");
const axios = require("axios");
const router = express.Router();

// Judge0 API Details
const JUDGE0_API = "https://judge0-ce.p.rapidapi.com/submissions";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY; // Store in .env

// Language ID Mapping
const languageMap = {
  javascript: 63,
  python: 71,
  cpp: 54,
  c: 50,
  java: 62
};

// POST Route for Code Execution
router.post("/run", async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  const language_id = languageMap[language.toLowerCase()];
  if (!language_id) {
    return res.status(400).json({ error: "Unsupported language" });
  }

  try {
    const response = await axios.post(
      `${JUDGE0_API}?base64_encoded=false&wait=true`,
      { source_code: code, language_id },
      { headers: { "X-RapidAPI-Key": RAPIDAPI_KEY } }
    );

    res.json({ output: response.data.stdout || response.data.stderr });
  } catch (error) {
    console.error("Error executing code:", error);
    res.status(500).json({ error: "Error executing code" });
  }
});

module.exports = router;
