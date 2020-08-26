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
var currentLanguage = "Python";

io.on('connection', socket => {
    // The emit below syncs the new client with current state
    socket.emit('code-update', currentCode);
    socket.emit('language-change', currentLanguage);

    socket.on('code-update', code => {
        currentCode = code;
        socket.broadcast.emit('code-update', code);
    });

    socket.on('language-change', language => {
        currentLanguage = language;
        socket.broadcast.emit('language-change', language);
    });
});

http.listen(port, () => console.log(`Server listening on port ${port}`));