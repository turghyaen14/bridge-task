require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// Define Schema & Model
const scoreSchema = new mongoose.Schema({
    name: String,
    score: Number
});
const Score = mongoose.model("Score", scoreSchema);

// API Endpoints
app.get('/scores', async (req, res) => {
  try {
      const scores = await Score.find({}); // Fetch all documents
      console.log("Fetched Scores:", scores); // Debugging
      res.json(scores);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.post('/scores', async (req, res) => {
    const { name, score } = req.body;
    try {
        const newScore = new Score({ name, score });
        await newScore.save();
        res.status(201).json(newScore);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));