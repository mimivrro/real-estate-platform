const fs = require("fs");
const path = require("path");

const listingsFilePath = path.join(__dirname, "..", "..", "data", "listings.json");

function loadListings() {
  try {
    const data = fs.readFileSync(listingsFilePath, "utf-8");
    const listings = JSON.parse(data);
    return Array.isArray(listings) ? listings : [];
  } catch (err) {
    console.error("Error reading listings file:", err);
    return [];
  }
}

function saveListings(listings) {
  try {
    fs.writeFileSync(listingsFilePath, JSON.stringify(listings, null, 2));
  } catch (err) {
    console.error("Error saving listings file:", err);
    throw new Error("Failed to save listing data");
  }
}

exports.getAllListings = (req, res) => {
  try {
    const listings = loadListings();
    res.json({
      message: "Listings retrieved successfully",
      count: listings.length,
      listings: listings
    });
  } catch (error) {
    console.error("Error getting listings:", error);
    res.status(500).json({ error: "Failed to retrieve listings." });
  }
};

exports.createListing = (req, res) => {
  try {
    const { title, location, price, imageUrl, description, sellerEmail } = req.body;

    // Validation
    if (!title || !location || !price || !imageUrl || !description || !sellerEmail) {
      return res.status(400).json({ 
        error: "All listing fields are required.",
        required: ["title", "location", "price", "imageUrl", "description", "sellerEmail"]
      });
    }

    // Price validation
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return res.status(400).json({ error: "Price must be a valid positive number." });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sellerEmail)) {
      return res.status(400).json({ error: "Invalid seller email format." });
    }

    const listings = loadListings();
    const newListing = { 
      id: Date.now().toString(),
      title: title.trim(),
      location: location.trim(),
      price: numericPrice,
      imageUrl: imageUrl.trim(),
      description: description.trim(),
      sellerEmail: sellerEmail.toLowerCase().trim(),
      createdAt: new Date().toISOString()
    };
    
    listings.push(newListing);
    saveListings(listings);

    res.status(201).json({ 
      message: "Listing added successfully", 
      listing: newListing 
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    res.status(500).json({ error: "Failed to create listing." });
  }
};

exports.deleteListing = (req, res) => {
  try {
    const id = req.params.id;
    const listings = loadListings();

    const listingIndex = listings.findIndex(listing => listing.id === id);

    if (listingIndex === -1) {
      return res.status(404).json({ 
        error: "Listing not found.",
        providedId: id
      });
    }

    const deletedListing = listings.splice(listingIndex, 1)[0];
    saveListings(listings);
    
    res.json({ 
      message: "Listing deleted successfully.",
      deletedListing: deletedListing
    });
  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ error: "Failed to delete listing." });
  }
};