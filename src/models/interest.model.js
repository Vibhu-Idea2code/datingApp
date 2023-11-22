// src/models/User.js
const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
});

const Hobbies = mongoose.model('hobbies', interestSchema);

module.exports = Hobbies;
