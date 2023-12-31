const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./src/db/dbconnection");
const config = require("./src/config/config");
const cors = require("cors");
const routes = require("./src/routes/v1");
const path = require("path");
// require("./src/middlewares/upload");
const app = express();
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());
app.options("*", cors());

app.use(express.static(path.resolve(__dirname, `./src/public`)));
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve(__dirname, `./src/views`)));

app.use("/v1", routes);
app.use(
  "/profile",
  express.static(path.join(__dirname, "./src/public/profile_images"))
);

app.use(express.static(path.resolve("./src/views/index.html")));

connectDB();

server.listen(config.port, () => {
  console.log("server listing the port " + config.port);
});
