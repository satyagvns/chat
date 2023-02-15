// Importing Modules and declarations
// Inintializing express here
let express = require('express');
let app = express();

// Initializing http service
let http = require('http');
let server = http.Server(app);

// Initializing socket service
let socketIO = require('socket.io');
let io = socketIO(server);

// Initializing port
const port = process.env.PORT || 3000;
// declaration ends here

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        socket.broadcast.to(data.room).emit('Joined to chat');
    });
    socket.on('message', (data) => {
        io.on(data.room).emit('new message', {user : data.user, message : data.message});
    })
});

server.listen(port, () => {
    console.log(`Sever is running on ${port} port`);
});
