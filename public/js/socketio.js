// socket.io.js

// Importe o objeto app do arquivo index.js
const app = require('../../index.js');

// Crie um servidor HTTP usando o objeto app como middleware
const server = require('http').Server(app);

// Inicie o Socket.io usando o servidor HTTP criado acima
const io = require('socket.io')(server);

// Configure o Socket.io para escutar por uma conexão do cliente
io.on('connection', function (socket) {
  // Código para lidar com a conexão do cliente aqui...
    console.log('Um cliente se conectou!');
});

// Exporte o objeto server para que ele possa ser importado em outro arquivo

module.exports = server;
module.exports = io;
