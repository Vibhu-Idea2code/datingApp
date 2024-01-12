// const { Server } = require('socket.io');
// const http = require('http');

// const server = http.createServer();
// const io = new Server(server);

// server.listen(3001); // Assuming your server is running on port 3001

// module.exports = io;
const User = require('./src/models/users.model');
const Notification = require('./src/models/notification.model');
let usersio = [];

module.exports = function (io) {
  io.on('connection', (socket) => {
    socket.on('setUserId', async (userId) => {
      if (userId) {
        const oneUser = await User.findById(userId).lean().exec();
        if (oneUser) {
          usersio[userId] = socket;
          console.log(`⚡ Socket: User with id ${userId} connected`);
        } else {
          console.log(`🚩 Socket: No user with id ${userId}`);
        }
      }
    });
    socket.on('getNotificationsLength', async (userId) => {
      const notifications = await Notification
        .find({ user: userId, read: false })
        .lean();
      usersio[userId]?.emit('notificationsLength', notifications.length || 0);
    });

    socket.on('disconnect', (userId) => {
      console.log(`🔥 user with id ${userId} disconnected from socket`);
      usersio[userId] = null;
    });
  });
};