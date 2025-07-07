const express = require("express");
const router = express.Router();
const { 
  getAllListings, 
  createListing, 
  deleteListing 
} = require("../controllers/listingController");

// Get all listings
router.get("/listings", getAllListings);

// Create new listing
router.post("/listings", createListing);

// Delete listing by ID
router.delete("/listings/:id", deleteListing);

module.exports = router;