const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  attendees: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      hasPaid: { type: Boolean, default: false },
      attended: { type: Boolean, default: false },
    },
  ],
});

const Class = mongoose.model("Class", classSchema);
module.exports = Class;
