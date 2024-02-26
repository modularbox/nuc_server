// Importa la biblioteca de Socket.io
const socketio = require('socket.io');

// Crea un servidor HTTP con Express
const express = require('express');
const app = express();
const server = require('http').createServer(app);

// Crea una instancia de Socket.io y pásale el servidor HTTP
const io = socketio(server);

// Maneja la conexión de un cliente
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Maneja los mensajes recibidos del cliente
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);

    // Emite un mensaje de vuelta al cliente
    socket.emit('mensaje', 'Mensaje recibido correctamente');
  });
});

// Escucha en un puerto específico
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor de sockets escuchando en el puerto ${PORT}`);
});
