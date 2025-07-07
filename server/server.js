const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../public"));

// Routes
const userRoutes = require("./routes/users");
const listingRoutes = require("./routes/listings");

app.use("/api", userRoutes);
app.use("/api", listingRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Real Estate Platform API is running!",
    endpoints: {
      users: {
        register: "POST /api/register",
        login: "POST /api/login"
      },
      listings: {
        getAll: "GET /api/listings",
        create: "POST /api/listings",
        delete: "DELETE /api/listings/:id"
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 API Documentation available at http://localhost:${PORT}`);
});