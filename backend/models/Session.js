// Model for the coach scheduling practices
// date time participants are chosen by the user
const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;