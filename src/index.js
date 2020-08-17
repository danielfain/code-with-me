const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 7777;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

var prevMessage = "";

io.on('connection', socket => {
    console.log(`${socket.id} connected.`);
    // The emit below syncs the new client with current state
    socket.emit('message', prevMessage);
    socket.on('message', event => {
        prevMessage = event;
        socket.broadcast.emit('message', event);
    });
});

io.on('disconnect', event => {
    console.log('Someone left.');
});

http.listen(port, () => console.log(`Server listening on port ${port}`));