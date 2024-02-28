const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const logs = require('./app/utils/logs');
// Libreria para la peticion de las luces
const luces = require('./app/routes/place');
var socketAll;
// Middleware para analizar datos JSON en el cuerpo de la solicitud.
app.use(express.json());
app.use(cors());
// Puerto para las peticiones nodejs
const PORT = 3001;
app.use('/luces', luces)

app.post('/luces/id', (req, res) =>{
    const jsonData = req.body;
    logs(JSON.stringify(jsonData, null, 2))
    res.status(200).send(`Luces enviadas con el idlisto`);
})
/// Iniciar el servidor
app.listen(PORT, () => {
  logs('Listo por el puerto, ', PORT);
});

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
  socketAll =socket;
  // Maneja los mensajes recibidos del cliente
  socket.on('mensaje', (data) => {
    logs('Mensaje recibido:', data);

    // Emite un mensaje de vuelta al cliente
    socket.emit('mensaje', 'Mensaje recibido correctamente');
  });
});

// Escucha en un puerto específico
const PORTSOCKET = 3005;
server.listen(PORTSOCKET, () => {
  logs(`Servidor de sockets escuchando en el puerto ${PORTSOCKET}`);
});
