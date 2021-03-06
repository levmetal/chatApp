const express = require('express');
const socketio = require('socket.io');
const http=require('http');
const cors = require('cors');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
const PORT= process.env.PORT || 4000       //// puerto asignado
const router = require ('./router');
const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(router);

//socket.io///////////////////socket.io////////////////////socket.io/////////
const io=socketio(server);

io.on('connect', (socket) => {
  console.log('conectado');
  //     ======>>>>>    AL UNIRSE A LA SALA        /////////

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);
    socket.join(user.room);

    socket.emit('message', { user: 'administrador', text: `${user.name}, Bienvenido a la sala ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'administrador', text: ` ${user.name} se unio a la sala ` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  })
  //     ======>>>>>    AL ENVIAR EL MENSAJE/////////

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  //     ======>>>>>    AL IRSE DE LA SALA /////////

  socket.on('disconnect', ()=>{
    console.log('desconectado');
    const user = removeUser(socket.id)
    if(user){
      io.to(user.room).emit('message', {user: 'administrador', text:`${user.name} se ha ido de la sala ${user.room}`})
    }
  })
})

////////////////////////////////////////////////////////////////////////////
app.use(cors);
app.use(router);

 server.listen(PORT, ()=> console.log(`el servidor funciona en el puerto ${PORT}`))
