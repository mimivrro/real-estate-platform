const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: String,
  sellerEmail: { type: String, required: true }, // Link to seller
}, { timestamps: true });

module.exports = mongoose.model("Listing", listingSchema);
