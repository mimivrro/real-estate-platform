const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String,
  imageUrl: String,
  description: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 👈 Reference
});

module.exports = mongoose.model('Listing', listingSchema);
