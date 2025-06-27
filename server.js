const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const usersFilePath = path.join(__dirname, "data", "users.json");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Load users from file
let users = [];
try {
  const data = fs.readFileSync(usersFilePath, "utf-8");
  users = JSON.parse(data);
  if (!Array.isArray(users)) users = [];
} catch (err) {
  console.error("Error reading users file:", err);
  users = [];
}

// REGISTER
app.post("/api/register", (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists." });
  }

  const newUser = { name, email, password, role };
  users.push(newUser);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: "User registered successfully." });
});

// LOGIN
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  res.status(200).json({ message: "Login successful", user });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



const listingsFilePath = path.join(__dirname, "data", "listings.json");

// Load listings from file
let listings = [];
try {
  const data = fs.readFileSync(listingsFilePath, "utf-8");
  listings = JSON.parse(data);
  if (!Array.isArray(listings)) listings = [];
} catch (err) {
  console.error("Error reading listings file:", err);
  listings = [];
}

// GET all listings
app.get("/api/listings", (req, res) => {
  res.json(listings);
});

// POST a new listing
app.post("/api/listings", (req, res) => {
  const { title, location, price, imageUrl, description, sellerEmail } = req.body;

  if (!title || !location || !price || !imageUrl || !description || !sellerEmail) {
    return res.status(400).json({ error: "All listing fields are required." });
  }

  const newListing = { title, location, price, imageUrl, description, sellerEmail };
  listings.push(newListing);
  fs.writeFileSync(listingsFilePath, JSON.stringify(listings, null, 2));

  res.status(201).json({ message: "Listing added successfully", listing: newListing });
});




// DELETE listing by ID (or index or title)
app.delete("/api/listings/:index", (req, res) => {
  const index = parseInt(req.params.index);

  let listings = [];
  try {
    const data = fs.readFileSync(listingsFilePath, "utf-8");
    listings = JSON.parse(data);
  } catch (err) {
    return res.status(500).json({ error: "Error reading listings file." });
  }

  if (isNaN(index) || index < 0 || index >= listings.length) {
    return res.status(400).json({ error: "Invalid index." });
  }

  listings.splice(index, 1); // remove the listing

  fs.writeFileSync(listingsFilePath, JSON.stringify(listings, null, 2));
  res.json({ message: "Deleted successfully." });
});
