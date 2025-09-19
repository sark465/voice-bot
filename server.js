// Load environment variables
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve frontend files

// Optional: POST endpoint for OpenAI (can be skipped for pre-programmed answers)
app.post('/chat', async (req, res) => {
    res.json({ reply: "This bot uses pre-programmed answers for the assessment." });
});

// Start server and auto-open browser (Windows)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    try {
        exec(`start http://localhost:${PORT}`);
    } catch (err) {
        console.error("Failed to open browser automatically:", err);
    }
});
