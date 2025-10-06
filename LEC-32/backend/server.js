const { WebSocketServer } = require("ws");

const wss = new WebSocketServer({ port: 8888 });

console.log("WebSocket server is running on ws://localhost:8888");

// const express = require("express");
// const app = express()

//broadcast messages to all sockets
let allSocket = [];

wss.on("connection", function (socket) {
  console.log("client connected");//when connection to socket established

  allSocket.push(socket);

  socket.on("message", function (message) {
    console.log("message received " + message.toString());

    allSocket.forEach((s) => {
      s.send(message.toString());
    });
  });
});
