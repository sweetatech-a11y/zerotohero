// server.js — Lightweight Express proxy for Anthropic API
// This keeps your API key on the server side (never exposed to the browser).
//
// SETUP:
//   npm install express cors
//   Create .env with: ANTHROPIC_API_KEY=sk-ant-...
//   node server.js
//
// The proxy runs on port 3001 and forwards requests to Anthropic's API.

import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

// Load API key from environment
const API_KEY = process.env.ANTHROPIC_API_KEY;

if (!API_KEY) {
  console.error("\n⚠️  Missing ANTHROPIC_API_KEY in environment variables.");
  console.error("   Create a .env file with: ANTHROPIC_API_KEY=sk-ant-...\n");
}

app.use(cors({ origin: "http://localhost:5173" })); // Vite default port
app.use(express.json());

app.post("/api/ai", async (req, res) => {
  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured on server" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Anthropic API error:", err);
    res.status(500).json({ error: "Failed to reach Anthropic API" });
  }
});

app.listen(PORT, () => {
  console.log(`\n🟢 AI proxy running at http://localhost:${PORT}/api/ai\n`);
});
