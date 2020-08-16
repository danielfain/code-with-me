const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 7777;

http.listen(port, () => console.log(`Server listening on port ${port}`));

io.on('connection', socket => {
    console.log('Connected');
    socket.on('message', event => {
        console.log(event);
        socket.broadcast.emit('message', event);
    });
});

io.on('disconnect', event => {
    console.log('Someone left.');
});