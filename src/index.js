const http = require('http').createServer();
const io = require('socket.io')(http);
const port = 7777;

http.listen(port, () => console.log(`Server listening on port ${port}`));
