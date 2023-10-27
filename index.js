const express = require('express');
const app = express();
// const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const path = require('path');
const io = new socketio.Server(server);
const PORT = process.env.PORT || 4000;
app.use('/', express.static(path.join(__dirname, 'public')));

const users = {};

io.on('connection', (socket)=>{
    // console.log('User connected!!');
    socket.on('send-msg', (data)=>{
        console.log(data);
        io.emit('received-msg',
        {
            id:socket.id,
            msg:data.msg, 
            username:users[socket.id]
        });
    });

    socket.on('login', (data)=>{
        users[socket.id]=data.username;
    })
})

server.listen(PORT, ()=>{
    console.log('Server is up PORT: ', PORT);
})
