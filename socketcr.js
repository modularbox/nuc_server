const WebSocket = require('ws');

// Conectar al servidor WebSocket
const ws = new WebSocket('https://api.conectateriolobos.es:3005');

// Escuchar eventos de conexión
ws.on('open', () => {
    console.log('Conexión establecida con el servidor.');

    // Enviar mensaje al servidor
    ws.send('Hola servidor, soy el cliente.');
});

// Escuchar eventos de mensajes desde el servidor
ws.on('message', message => {
    console.log('Mensaje recibido del servidor:', message);
});

// Escuchar eventos de cierre de conexión
ws.on('close', () => {
    console.log('Conexión con el servidor cerrada.');
});

// Manejar errores de conexión
ws.on('error', err => {
    console.error('Error de conexión:', err.message);
});
