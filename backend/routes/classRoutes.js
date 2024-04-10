const express = require("express");
const router = express.Router();
const Class = require("../models/Class"); // Adjust the path to where your Class model is defined

// Create a new class
router.post("/classes", async (req, res) => {
  try {
    const newClass = new Class(req.body);
    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all classes
router.get("/classes", async (req, res) => {
  try {
    const classes = await Class.find().populate("coach attendees.user");
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/classes/:id", async (req, res) => {
  try {
    const classes = await Class.find({_id: req.params.id}).populate("coach attendees.user");
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Update a class
router.put("/classes/:id", async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedClass);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a class
router.delete("/classes/:id", async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Class" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a user to a class
router.post('/classes/:id/users', async (req, res) => {
  try {
    const updatedClass = await Class.findByIdAndUpdate(
      req.params.id,
      { $push: { attendees: { user: req.body.userId, hasPaid: false, attended: false } } },
      { new: true }
    );
    res.json(updatedClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

