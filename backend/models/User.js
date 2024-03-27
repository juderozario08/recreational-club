//Bcrypt is used for hashing the password 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: { // Add phone number field
    type: String,
    required: true,
  },
  address: { // Add address field
    type: String,
    required: true,
  },
  role: { type: String, enum: ['member', 'coach', 'treasurer'], default: 'member' },
});

//Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
      }
      next(); 
});

const User = mongoose.model('User', userSchema);
module.exports = User;