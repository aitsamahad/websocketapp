const express = require("express");
const BackSocket = require("socket.io");

// App setup
const app = express();

app.use(express.static("public"));

// Starting the server
const server = app.listen(4000, () => {
  console.log("listening to port 4000");
});

// Socket Setup
const io = BackSocket(server);

// Reading when connection established
io.on("connection", socket => {
  console.log("Connection Established", socket.id);
  socket.on("chat", data => {
    // data is the data we are receiving
    io.sockets.emit("chat", data);
  }); //'chat' is simply the name that we have already provided and are receiving from the frontend

  // Broadcasting the message to everyone but the sender
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
