const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 7777;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

var currentCode = "";

io.on('connection', socket => {
    // The emit below syncs the new client with current state
    socket.emit('code-update', currentCode);

    socket.on('code-update', code => {
        currentCode = code;
        socket.broadcast.emit('code-update', code);
    });

    socket.on('language-change', language => {
        socket.broadcast.emit('language-change', language);
    });

    socket.once('disconnect', () => {
        console.log(`${socket.id} left.`);
    });
});

http.listen(port, () => console.log(`Server listening on port ${port}`));