const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: { type: String  },
  text: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
