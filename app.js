const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const logs = require('./app/utils/logs');
// Libreria para la peticion de las luces
const luces = require('./app/routes/place');
// Middleware para analizar datos JSON en el cuerpo de la solicitud.
app.use(express.json());
app.use(cors());
// Puerto para las peticiones nodejs
const PORT = 3000;
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


// // Crear servidor HTTP
// const server = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Servidor HTTP funcionando correctamente.');
// });
// // Crear servidor WebSocket
// const wss = new WebSocket.Server({ server });

// // Escuchar eventos de conexión de WebSocket
// wss.on('connection', ws => {
//     logs('Cliente WebSocket conectado.');

//     // Escuchar eventos de mensajes desde el cliente
//     ws.on('message', message => {
//         logs('Mensaje recibido del cliente:', message);
        
//         // Enviar respuesta al cliente
//         ws.send('Mensaje recibido por el servidor.');
//     });

//     // Escuchar eventos de cierre de conexión
//     ws.on('close', () => {
//         logs('Cliente WebSocket desconectado.');
//     });

//     // Manejar errores de conexión
//     ws.on('error', err => {
//         logs('Error de conexión:', err.message);
//     });
// });

// // Escuchar en un puerto específico
// const PORTSOCKET = 3005;
// server.listen(PORTSOCKET, () => {
//     logs(`Servidor HTTP y WebSocket escuchando en el puerto ${PORTSOCKET}`);
// });


// // // servidor.js
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

// const PORTSOCKET = 3005;
// server.listen(PORTSOCKET, () => {
//   logs(`Servidor escuchando en el puerto ${PORTSOCKET}`);
// });