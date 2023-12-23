const { Server } = require('socket.io');
const http = require('http');

const server = http.createServer();
const io = new Server(server);

server.listen(3001); // Assuming your server is running on port 3001

module.exports = io;
