const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Save logs to logs.txt
app.post("/log", (req, res) => {
    const { ip, userAgent, organization, status } = req.body;
    const logEntry = `${new Date().toISOString()} - ${ip} - ${organization} - ${userAgent} - ${status}\n`;

    fs.appendFile("logs.txt", logEntry, (err) => {
        if (err) console.error("Error writing to log:", err);
    });

    res.sendStatus(200);
});

// Health check for Render
app.get("/", (req, res) => {
    res.send("Bot Logger is running!");
});

// Use Render's PORT environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
