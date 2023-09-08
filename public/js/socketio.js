
const app = require('../../index.js');
const server = require('http').Server(app);
const io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('Um cliente se conectou!');
});

module.exports = server;
module.exports = io;
