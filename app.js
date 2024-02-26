const express = require('express');
const cors = require('cors');
const app = express();
const logs = require('./app/utils/logs');
// Libreria para la peticion de las luces
const luces = require('./app/routes/place');
// Middleware para analizar datos JSON en el cuerpo de la solicitud.
app.use(express.json());
app.use(cors());
// Puerto para las peticiones nodejs
const PORT = 3000;
app.use('/luces', luces)
/// Iniciar el servidor
app.listen(PORT, () => {
  logs('Listo por el puerto, ', PORT);
});



// // servidor.js
// const net = require('net');

// const server = net.createServer((socket) => {
//   logs('Cliente conectado');

//   socket.on('encender', (data) => {
//     logs('Mensaje del cliente encender:', data.toString());
//   });

//   socket.on('end', () => {
//     logs('Cliente desconectado');
//   });
// });

// const PORTSOCKET = 8080;
// server.listen(PORTSOCKET, () => {
//   logs(`Servidor escuchando en el puerto ${PORTSOCKET}`);
// });