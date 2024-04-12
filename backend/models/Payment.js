//Payment scheme model for members
// Features the member, amount paid or oweing, and
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  date: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  forMonth: { type: Boolean, default: false },
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
