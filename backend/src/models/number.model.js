// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  otpExpiry: { type: Date, required: true },
});

const Number = mongoose.model('number', userSchema);

module.exports = Number;
