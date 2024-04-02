const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path to where your User model is located
const router = express.Router();

router.post('/login', async (req, res) => {
  // Destructure email and password from request body
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // User is authenticated, generate a token
    const token = jwt.sign(
        { userId: user._id, role: user.role }, // Include the user role in the payload
        process.env.TOKEN_SECRET,
        { expiresIn: '1h' }
      );

    // Respond with token (and user data as needed)
    res.json({ token, userId: user._id, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
