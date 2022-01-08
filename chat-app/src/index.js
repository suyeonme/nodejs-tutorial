const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const {
  generateMessage,
  generateLocationMessage,
} = require('./utils/messages');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/users');

const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

io.on('connection', socket => {
  console.log('new websocket connection');

  socket.on('join', ({ username, room }, cb) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return cb(error);
    }

    socket.join(user.room);

    socket.emit(
      'message',
      generateMessage(user.username, `Welcome ${user.username}`)
    );
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        generateMessage(user.username, `${user.username} has joined.`)
      );

    cb();
  });

  socket.on('sendMessage', (msg, callback) => {
    const user = getUser(socket.id);

    const filter = new Filter();

    if (filter.isProfane(msg)) {
      return callback('Profanity is not allowed');
    }
    io.to(user.room).emit('message', generateMessage(user.username, msg));
    callback();
  });

  socket.on('sendLocation', (coords, callback) => {
    const user = getUser(socket.id);
    const googleMapUrl = `https://google.com/maps?q=${coords.latitude},${coords.longitude}`;

    io.to(user.room).emit(
      'locationMessage',
      generateLocationMessage(user.username, googleMapUrl)
    );
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        generateMessage(user.username, `${user.username} has left.`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
