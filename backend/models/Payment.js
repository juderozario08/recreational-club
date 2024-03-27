//Payment scheme model for members
// Features the member, amount paid or oweing, and 
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  balance: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;