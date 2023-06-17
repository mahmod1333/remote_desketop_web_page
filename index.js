const express = require('express');
const app = express();
const ServerRouter = require("./Routes/server.routes");
const ClientRouter = require("./Routes/client.routes");
const cors = require('cors')
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
const path = require('path');
// Create the express app
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on("join-message", (roomId) => {
    socket.join(roomId);
    console.log("User joined in a room : " + roomId);
  })

  socket.on("screen-data", function (data) {
    data = JSON.parse(data);
    var room = data.room;
    var imgStr = data.image;
    socket.broadcast.to(room).emit('screen-data', imgStr);
  })

  socket.on("mouse-move", function (data) {
    var room = JSON.parse(data).room;
    socket.broadcast.to(room).emit("mouse-move", data);
  })
  socket.on("start-conn", function (data) {
    var room = data;
    socket.broadcast.to(room).emit("start-conn", true);
  })

  socket.on("mouse-click", function (data) {
    var room = JSON.parse(data).room;
    socket.broadcast.to(room).emit("mouse-click", data);
  });
  socket.on("touch", function (data) {
    var room = JSON.parse(data).room;

    socket.broadcast.to(room).emit("touch", data);
  })
  socket.on("touch-move", function (data) {
    var room = JSON.parse(data).room;

    socket.broadcast.to(room).emit("touch-move", data);
  });
 

  socket.on("type", function (data) {
    var room = JSON.parse(data).room;
    socket.broadcast.to(room).emit("type", data);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
app.use(cors())
// Routes and middleware

app.use("/src",express.static(path.join(__dirname,"src")))

app.use("/client", ClientRouter);
app.use("/server", ServerRouter);
// Error handlers

// Start server
app.listen(1234, function (err) {
  if (err) {
    return console.error(err)
  }

  console.log('Started at http://localhost:1234')
})
io.listen(9000);
