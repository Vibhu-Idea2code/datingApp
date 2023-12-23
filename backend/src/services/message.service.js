const messageController = require('../controllers/message.controller');
// const io = require('../socket'); // Import Socket.io instance

async function getAllMessages() {
  return await messageController.getAllMessages();
}

async function createMessage(user, text) {
  const newMessage = await messageController.createMessage(user, text);
  io.emit('message', `${user}: ${text}`);
  return newMessage;
}

module.exports = {
  getAllMessages,
  createMessage,
};

