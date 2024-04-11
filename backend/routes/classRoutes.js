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

// Get classes for a specific member
router.get('/classes/member/:memberId', async (req, res) => {
  try {
    const classes = await Class.find({ 'attendees.user': req.params.memberId }).populate('coach attendees.user');
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
    const classId = req.params.id;
    const userId = req.body.userId;

    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ message: "Class not found." });
    }

    const isUserAlreadyAdded = existingClass.attendees.some(attendee => attendee.user.toString() === userId);
    if (isUserAlreadyAdded) {
      return res.status(400).json({ message: "User is already an attendee." });
    }

    existingClass.attendees.push({ user: userId, hasPaid: false, attended: false });
    const updatedClass = await existingClass.save();

    res.json(updatedClass);
  } catch (error) {
    console.error('Error adding user to class:', error);
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to mark a user's payment for a class as complete
router.post('/classes/:id/pay', async (req, res) => {
  try {
    const classId = req.params.id;
    const userId = req.body.userId; // Assume userId is passed in the request body

    const existingClass = await Class.findById(classId);
    if (!existingClass) {
      return res.status(404).json({ message: "Class not found." });
    }

    // Find the attendee in the class's attendees list
    const attendeeIndex = existingClass.attendees.findIndex(attendee => attendee.user.toString() === userId);
    if (attendeeIndex === -1) {
      return res.status(404).json({ message: "User not found in class attendees." });
    }

    // Update the hasPaid status for the user
    existingClass.attendees[attendeeIndex].hasPaid = true;
    const updatedClass = await existingClass.save();

    res.json(updatedClass);
  } catch (error) {
    console.error('Error processing payment for class:', error);
    res.status(500).json({ message: error.message });
  }
});


router.get('/user-classes/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch all classes and populate user details in attendees
    const allClasses = await Class.find().populate('attendees.user');
    
    // Filter classes to include only those that have the specified user as an attendee
    const classesForUser = allClasses.filter(classItem =>
      classItem.attendees.some(attendee => attendee.user._id.toString() === userId)
    );

    res.json(classesForUser);
  } catch (error) {
    console.error(`Error fetching classes for user ${userId}:`, error);
    res.status(500).json({ message: 'Error fetching classes for user', error });
  }
});

router.get('/!user-classes/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch all classes and populate user details in attendees
    const allClasses = await Class.find().populate('attendees.user');
    
    // Filter classes to include only those that dont have the specified user as an attendee
    const classesForUser = allClasses.filter(classItem =>
      !classItem.attendees.some(attendee => attendee.user._id.toString() === userId)
    );

    res.json(classesForUser);
  } catch (error) {
    console.error(`Error fetching classes for user ${userId}:`, error);
    res.status(500).json({ message: 'Error fetching classes for user', error });
  }
});

module.exports = router;

