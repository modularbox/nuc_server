
const http = require('http');
const logs = require('./app/utils/logs');
// Importa la biblioteca de Socket.io
const socketio = require('socket.io');

// Crear servidor HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Servidor HTTP funcionando correctamente.');
});

// Crea una instancia de Socket.io y pásale el servidor HTTP
const io = socketio(server);

// Maneja la conexión de un cliente
io.on('connection', (socket) => {
  logs('Nuevo cliente conectado');
  console.log('Nuevo cliente conectado');
  // Maneja los mensajes recibidos del cliente
  socket.on('mensaje', (data) => {
    logs('Mensaje recibido:', data);
    console.log('Mensaje recibido:', data);

    // Emite un mensaje de vuelta al cliente
    socket.emit('mensaje', 'Mensaje recibido correctamente');
  });
});

// Escucha en un puerto específico
const PORTSOCKET = 3005;
server.listen(PORTSOCKET, () => {
  console.log(`Servidor de sockets escuchando en el puerto ${PORTSOCKET}`)
  logs(`Servidor de sockets escuchando en el puerto ${PORTSOCKET}`);
});