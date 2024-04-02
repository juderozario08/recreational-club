const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ensure this path is correct for your User model
const router = express.Router();

router.post('/signUp', async (req, res) => {
  // Extract name, email, and password from request body
  const { name, email, password, address, phoneNumber } = req.body;

  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Respond with a 409 Conflict status code if email is already in use
      return res.status(409).json({ message: "Email already in use." });
    }

    // Create a new user with the hashed password
    const user = new User({
      name,
      email,
      password,
      address,
      phoneNumber,
    });

    // Save the new user to the database
    await user.save();

    // Respond with the created user (excluding the password for security)
    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during signup." });
  }
});

module.exports = router;