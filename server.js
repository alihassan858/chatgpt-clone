const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ChatGPT Clone Backend is running!");
});

app.post("/chat", (req, res) => {
    const userMessage = req.body.message;

    res.json({
        reply: "Your backend received: " + userMessage
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
