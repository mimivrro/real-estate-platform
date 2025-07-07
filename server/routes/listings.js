const express = require("express");
const router = express.Router();
const Listing = require("../models/Listing");
const User = require("../models/User");

// POST /api/listings - Add new listing
router.post("/listings", async (req, res) => {
  try {
    const { title, price, location, imageUrl, description, sellerEmail } = req.body;

    const seller = await User.findOne({ email: sellerEmail, role: "Seller" });
    if (!seller) {
      return res.status(404).json({ error: "Seller not found or not a seller role." });
    }

    const listing = new Listing({
      title,
      price,
      location,
      imageUrl,
      description,
      seller: seller._id
    });

    await listing.save();
    res.status(201).json({ message: "Listing created", listing });
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(500).json({ error: "Failed to create listing" });
  }
});
