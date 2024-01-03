// src/models/User.js
const mongoose = require('mongoose');

const signSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  status:{type: Boolean,default: true},

},{
  timestamps: true,
  versionKey: false
});

const Sign = mongoose.model('sign', signSchema);

module.exports = Sign;
