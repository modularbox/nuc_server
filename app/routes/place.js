const express = require('express')
const fs = require('fs')
const router = express.Router();
const logs = require('../utils/logs');

router.post('/:place', async (req, res) => {
    // Tomar el lugar de la url
    const place = req.params.place;
    JSON_FILE = `app/configuracion_luces/${place}.json` ;
    logs(`Configuracion luces ${place}`);
    // Obtener el JSON enviado en la solicitud POST
    const jsonData = req.body;
    // Escribir el JSON en el archivo
    fs.writeFile(JSON_FILE, JSON.stringify(jsonData, null, 2), err => {
        if (err) {
            logs('Error al guardar el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
           logs('Archivo JSON guardado correctamente');
            res.status(200).send(`Configuracion de luces ${place} listo`);
        }
    });
});

// Ruta para manejar solicitudes GET
router.get('/:place', (req, res) => {
    const place = req.params.place;
    JSON_FILE = `app/configuracion_luces/${place}.json` ;
    // Leer el archivo JSON y enviarlo como respuesta
    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        if (err) {
            logs('Error al leer el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            logs(`Enviado configuracion ${place} correctamente`)
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});

module.exports = router;