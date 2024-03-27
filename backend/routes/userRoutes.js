const express = require('express');
const router = express.Router();
const User = require('../models/User.js'); // Adjust the path as necessary

// POST route to create a new user
router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

// GET route to fetch a single user by id
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// PATCH route to update a user by id
router.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE route to delete a user by id
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

// PUT route to update user information
router.put('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

module.exports = router;