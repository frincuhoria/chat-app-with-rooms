const app = require("express")();
const http = require("http").createServer(app);
const io = require('socket.io')(http, {  cors: {
  origin: '*',
}});
const router = require("./router");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js');

app.use(router);

io.on("connection", (socket) => {

  socket.on("join", ({ name, room }, callback) => {
    const {error, user } = addUser({ id: socket.id, name, room });

    console.log(name,room);

    if(error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name},welcome to the room ${user.room}`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!`})

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User had left!!!");
  });
});


http.listen(4000, () => {
  console.log("listening on port 4000");
});

