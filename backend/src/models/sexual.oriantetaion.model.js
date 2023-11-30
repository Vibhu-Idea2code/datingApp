// src/models/User.js
const mongoose = require('mongoose');

const orientaionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
},{
  timestamps: true,
  versionKey: false
});

const Sexual = mongoose.model('sexual', orientaionSchema);

module.exports = Sexual;
