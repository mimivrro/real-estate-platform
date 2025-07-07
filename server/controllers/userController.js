const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "..", "data", "users.json");

function loadUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, "utf-8");
    const users = JSON.parse(data);
    return Array.isArray(users) ? users : [];
  } catch (err) {
    console.error("Error reading users file:", err);
    return [];
  }
}

function saveUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error saving users file:", err);
    throw new Error("Failed to save user data");
  }
}

exports.registerUser = (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ 
        error: "All fields are required.",
        required: ["name", "email", "password", "role"]
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Role validation
    const validRoles = ["buyer", "seller", "agent"];
    if (!validRoles.includes(role.toLowerCase())) {
      return res.status(400).json({ 
        error: "Invalid role.",
        validRoles: validRoles
      });
    }

    const users = loadUsers();
    const existingUser = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists." });
    }

    const newUser = { 
      id: Date.now().toString(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // In production, this should be hashed
      role: role.toLowerCase(),
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);

    // Don't return password in response
    const { password: _, ...userResponse } = newUser;
    res.status(201).json({ 
      message: "User registered successfully.",
      user: userResponse
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error during registration." });
  }
};

exports.loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        error: "Email and password are required." 
      });
    }

    const users = loadUsers();
    const user = users.find((u) => 
      u.email.toLowerCase() === email.toLowerCase().trim() && 
      u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Don't return password in response
    const { password: _, ...userResponse } = user;
    res.status(200).json({ 
      message: "Login successful", 
      user: userResponse 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error during login." });
  }
};