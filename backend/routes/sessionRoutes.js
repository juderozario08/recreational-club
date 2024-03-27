const express = require('express');
const router = express.Router();
const Session = require('../models/Session');

// POST route to create a new session
router.post('/sessions', async (req, res) => {
  const session = new Session(req.body);
  try {
    await session.save();
    res.status(201).send(session);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to fetch all sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await Session.find({});
    res.send(sessions);
  } catch (error) {
    res.status(500).send();
  }
});

// Delete route to delete a session 
router.delete('/sessions/:id', async (req, res) => {
    try {
      const session = await Session.findByIdAndDelete(req.params.id);
  
      if (!session) {
        return res.status(404).send('Session not found.');
      }
  
      res.send(session);
    } catch (error) {
      res.status(500).send(error);
    }
  });

module.exports = router;
