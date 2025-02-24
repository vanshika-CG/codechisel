const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load environment variables

const router = express.Router();

const JUDGE0_API = "https://judge0-ce.p.rapidapi.com/submissions";
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY; // Load from .env

const languageMap = {
  javascript: 63,
  python: 71,
  cpp: 54,
  c: 50,
  java: 62,
};

router.post("/run", async (req, res) => {
  const { code, language } = req.body; // ✅ Extract from request

  if (!code || !language) {
      return res.status(400).json({ error: "Code and language are required" });
  }

  const language_id = languageMap[language]; // ✅ Map string to number
  if (!language_id) {
      return res.status(400).json({ error: "Unsupported language" });
  }

  try {
      const response = await axios.post(
          `${JUDGE0_API}?base64_encoded=false&wait=true`,
          { source_code: code, language_id, stdin: "" },
          {
              headers: {
                  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
                  "X-RapidAPI-Key": RAPIDAPI_KEY,
                  "Content-Type": "application/json",
              },
          }
      );

      res.json({ output: response.data.stdout || response.data.stderr || "No output" });
  } catch (error) {
      console.error("Error executing code:", error);
      res.status(500).json({ error: "Error executing code" });
  }
});

module.exports = router;
