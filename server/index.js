const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000; // or 5000 if 3000 is in use

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Real Estate Backend API is running!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
