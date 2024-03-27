const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// POST route to record a new payment
router.post('/payments', async (req, res) => {
  const payment = new Payment(req.body);
  try {
    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET route to list all payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await Payment.find({});
    res.send(payments);
  } catch (error) {
    res.status(500).send();
  }
});



module.exports = router;
