const express = require('express')
const fs = require('fs')
const router = express.Router();
const logs = require('../utils/logs');

function getNewHorario() {
    // Obtener la hora actual
    const now = new Date();
    
    // Obtener horas, minutos y segundos
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    // Crear la cadena con el formato deseados
    const formattedTime = `${hours}:${minutes}:00`;
    // Agregar un minuto
    add5Minutos = now.setMinutes(now.getMinutes() + 1);
    // Obtener horas, minutos y segundos
    const hoursadd5Minutos = add5Minutos.getHours().toString().padStart(2, '0');
    const minutesadd5Minutos = add5Minutos.getMinutes().toString().padStart(2, '0');
    const secondsadd5Minutos = add5Minutos.getSeconds().toString().padStart(2, '0');
    // Crear la cadena con el formato deseado
    const formattedTimeadd5Minutos = `${hoursadd5Minutos}:${minutesadd5Minutos}:00`;
    return {
      horario_inicio: formattedTime,
      horario_fin: formattedTimeadd5Minutos
    };
}

function getLuces() {
    return {
        '1111_red': [1,2,11,21,22,31,32,51,61,71,81,91,101,111,121,131,141],
        '1111_green': [1,3,12,21,23,31,33,52,62,72,82,92,102,112,122,132,142],
        '1111_blue': [1,4,13,21,24,31,34,53,63,73,83,93,103,113,123,133,143],
        '1111_yellow': [1,2,3,11,12,21,22,23,31,32,33,51,52,61,62,71,72,81,82,91,92,101,102,111,112,121,122,131,132,141,142],
        '1111_orange': [1, [2, 170], 6, [7, 170], 11, [12, 170], 16, [17, 170] ],
        '1111_purple': [[1, 170], 3, [6, 170], 8, [11, 170], 13, [16, 170], 18],
    }
}
router.post('/id', async (req, res) => {
    const jsonData = req.body;
	logs(jsonData.id)
    logs(JSON.stringify(jsonData))
    fs.readFile(JSON_FILE, 'utf8', (err, data) => {
        var jsonFile = JSON.parse(data);
        if (err) {
            logs('Error al leer el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            logs(`Enviado configuracion modurlarbox correctamente`)
            res.setHeader('Content-Type', 'application/json');
            // var newArrayData = data.horarios;
            // Agregar un elemento al principio del array
            jsonFile.horarios.unshift(getNewHorario());
            data.cliente = {
                cliente: {
                "encender": getLuces[jsonData.id],
                    "apagar": [],
                    "horarios": getNewHorario()
            }};
            
            // Escribir el JSON en el archivo
            fs.writeFile('app/configuracion_luces/modularbox.json', JSON.stringify(data), err => {
                if (err) {
                    logs('Error al guardar el archivo JSON:', err);
                    res.status(500).send('Error interno del servidor');
                } else {
                logs('Archivo JSON guardado correctamente');
                    res.status(200).send('Configuracion de luces desaguadero listo');
                }
            });
            res.status(200).send(`Luces enviadas con el id listo`);
        }
    });
    
    // newJson = {
    //     encender: [
    //       1,
    //       3,
    //       12,
    //       21,
    //       23,
    //       31,
    //       33,
    //       52,
    //       62,
    //       72,
    //       82,
    //       92,
    //       102,
    //       112,
    //       122,
    //       132,
    //       142
    //     ],
    //     apagar: [],
    //     horarios: [
    //       {
    //         horario_inicio: "09:54:00",
    //         horario_fin: "09:55:00"
    //       },
    //       {
    //         horario_inicio: formattedTime,
    //         horario_fin: formattedTimeadd5Minutos
    //       }
    //     ]
    //   };
    // res.status(200).send(`Luces enviadas con el id listo`);
});


// router.post('/:place/id', async (req, res) => {
//     // Tomar el lugar de la url
//     const place = req.params.place;
//     // JSON_FILE = `app/configuracion_luces/${place}.json` ;
//     // logs(`Configuracion luces ${place}`);
//     // Obtener el JSON enviado en la solicitud POST
//     const jsonData = req.body;
//     logs(JSON.stringify(jsonData, null, 2))
//     [1234366434]
//     res.status(200).send(`Luces enviadas ${place} listo`);

//     // focos_encendidos = None
//     // colores = {
//     //     'red': [1, 6, 11, 16],
//     //     'green': [2, 7, 12, 17],
//     //     'blue': [3, 8, 13, 18],
//     //     'yellow': [1, 2, 6, 7, 11, 12, 16, 17],
//     //     'orange': [1, [2, 170], 6, [7, 170], 11, [12, 170], 16, [17, 170] ],
//     //     'purple': [[1, 170], 3, [6, 170], 8, [11, 170], 13, [16, 170], 18],
        
//     // }
//     // if color == 'red':
//     //     focos_encendidos = colores['red']
//     // elif color == 'green'
//     //     focos_encendidos = colores['green']
//     // elif color == 'blue'
//     //     focos_encendidos = colores['blue']
//     // elif color == 'yellow'
//     //     focos_encendidos = colores['yellow']
//     // elif color == 'orange'
//     //     focos_encendidos = colores['orange']
//     // elif color == 'purple'
//     //     focos_encendidos = colores['purple']

//     // return focos_encendidos
//     // // Escribir el JSON en el archivo
//     // fs.writeFile(JSON_FILE, JSON.stringify(jsonData, null, 2), err => {
//     //     if (err) {
//     //         logs('Error al guardar el archivo JSON:', err);
//     //         res.status(500).send('Error interno del servidor');
//     //     } else {
//     //        logs('Archivo JSON guardado correctamente');
//     //         res.status(200).send(`Configuracion de luces ${place} listo`);
//     //     }
//     // });
// });

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