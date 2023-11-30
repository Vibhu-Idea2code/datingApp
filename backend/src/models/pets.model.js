// src/models/User.js
const mongoose = require('mongoose');

const petsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  is_active:{type:Boolean},
},{
  timestamps: true,
  versionKey: false
}
);

const Pets = mongoose.model('pet', petsSchema);

module.exports = Pets;
