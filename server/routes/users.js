const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// @route   POST /api/register
// @desc    Register a new user
router.post("/register", registerUser);

// @route   POST /api/login
// @desc    Login an existing user
router.post("/login", loginUser);

module.exports = router;
