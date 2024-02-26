const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();
const logs = require('./app/utils/logs');
const fs = require('fs')

// Libreria para las pistas y sus llamadas a la base de datos.
const Pistas = require('./app/proveedor/pistas');
const pistas = new Pistas();
// Libreria para las pistas y sus llamadas a la base de datos.
const Proveedor = require('./app/proveedor/proveedor');
const proveedor = new Proveedor();
// Libreria para los usuarios y sus llamadas a la base de datos.
const Usuario = require('./app/usuarios/usuario');
const usuario = new Usuario();

// Middleware para analizar datos JSON en el cuerpo de la solicitud.
app.use(express.json());
app.use(cors());
// Puerto para las peticiones nodejs
const PORT = 3000;

// Establece el directorio de imágenes
const imagesDirectoryUsuario = path.join(__dirname, 'assets/images/usuarios');
const imagesDirectoryProveedor = path.join(
  __dirname,
  'assets/images/proveedores'
);

// Configura la ruta para servir imágenes
app.use('/images_usuario', express.static(imagesDirectoryUsuario));
// Configura la ruta para servir imágenes
app.use('/images_proveedor', express.static(imagesDirectoryProveedor));

// Configuracion para guardar la imagen
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req.body.destination);
    cb(null, `./assets/images/${req.body.destination}`);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    console.log(req.body.nameFoto);
    cb(null, `${req.body.nameFoto}.png`);
  },
});

const upload = multer({ storage });
// Guardar imagen en el servidor
app.post('/subir_imagen', upload.single('image'), (req, res) => {
  // resizeImage(req.file.path, `resize-${req.file.filename}`);
  console.log('Imagen subida correctamente');
  res.send({ data: 'Imagen creada' });
});

app.post('/pista', async (req, res) => {
  logs('Anadir Pista');
  try {
    await pistas.anadirPista(req.body);
  } catch (error) {
    logs('Error al anadir pista', error);
  }
  res.send({ data: 'Agregar pista' });
});

app.get('/pista', async (req, res) => {
  logs('get mis pistas');
  pistas = await pistas.getPistas();
  res.send(pistas);
});

app.post('/usuario', async (req, res) => {
  logs('Anadir Usuario');
  try {
    await usuario.anadirUsuario(req.body);
  } catch (error) {
    logs('Error al anadir usuario', error);
  }
  res.send({ data: 'Usuario agregado' });
});

app.put('/usuario', async (req, res) => {
  logs('Modificar Usuario');
  try {
    await usuario.modificarUsuario(
      req.body.id,
      req.body.datosUsuario,
      req.body.datosModificados
    );
  } catch (error) {
    logs('Error al modificar usuario', error);
  }
  res.send({ data: 'Usuario Modificado Correctamente' });
});

app.get('/usuario', async (req, res) => {
  logs('get mi usuario');
  result = await usuario.datosUsuario();
  res.send(result);
});

app.get('/usuario_existe_nick', async (req, res) => {
  logs('Existe nick');
  try {
    let existeUsuario = await usuario.existeNick(req.headers.nick);
    console.log(existeUsuario);
    res.send(existeUsuario);
  } catch (error) {
    logs('Error al obtener el nick', error);
    res.send({ data: false });
  }
});

app.post('/proveedor', async (req, res) => {
  logs('Anadir Proveedor');
  try {
    await proveedor.anadirProveedor(req.body);
  } catch (error) {
    logs('Error al anadir proveedor', error);
  }
  res.send({ data: 'Proveedor agregado' });
});

app.get('/proveedor', async (req, res) => {
    logs('get mi proveedor');
    result = await proveedor.datosProveedor();
    res.send(result);
  });

// app.post('/luces/ermita', async (req, res) => {
//     logs('Configuracion luces ermita');
//     // result = await proveedor.datosProveedor();
//     res.send('Configuracion de luces listo');
// });
JSON_FILE_ERMITA = 'configuracion_luces/ermita.json'
JSON_FILE_DESAGUADERO = 'configuracion_luces/desaguadero.json'
JSON_FILE_MODULARBOX = 'configuracion_luces/modularbox.json'
JSON_FILE_CAMPANARIO = 'configuracion_luces/campanario.json'
// Ruta para manejar solicitudes POST
app.post('/luces/ermita', (req, res) => {
    logs('Configuracion luces ermita');
    // Obtener el JSON enviado en la solicitud POST
    logs(req.body)
    const jsonData = req.body;
    logs(JSON.stringify(jsonData, null, 2))
    try {
        
        function convertHorario(horarios) {
            let newList = []
            for (let horario of horarios) {
                logs(horario.horario_inicio)
                let [hora_inicio, min_inicio, sec_inicio] = horario["horario_inicio"].split(":").map(part => parseInt(part));
                let [hora_fin, min_fin, sec_fin] = horario["horario_fin"].split(":").map(part => parseInt(part));
                newList.push({
                    hora_inicio: hora_inicio,
                    hora_fin: hora_fin, 
                    min_inicio: min_inicio,
                    min_fin: min_fin, 
                })
            }
            return newList
        }
        var newJson =  {
            encender: jsonData.encender,
            apagar: jsonData.apagar,
            horarios: convertHorario(jsonData.horarios)
        };

    } catch (error) {

        logs(error)
        res.status(200).send('Error ermita', error);
        
    }
    // Escribir el JSON en el archivo
    fs.writeFile(JSON_FILE_ERMITA, JSON.stringify(newJson, null, 2), err => {
        if (err) {
            logs('Error al guardar el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
           logs('Archivo JSON guardado correctamente');
            res.status(200).send('Configuracion de luces ermita listo');
        }
    });
});
/// Desaguadero
// Ruta para manejar solicitudes POST
app.post('/luces/desaguadero', (req, res) => {
    logs('Configuracion luces desaguadero');
    // Obtener el JSON enviado en la solicitud POST
    logs(req.body)
    const jsonData = req.body;
    logs(JSON.stringify(jsonData, null, 2))
    try {
        
        function convertHorario(horarios) {
            let newList = []
            for (let horario of horarios) {
                logs(horario.horario_inicio)
                let [hora_inicio, min_inicio, sec_inicio] = horario["horario_inicio"].split(":").map(part => parseInt(part));
                let [hora_fin, min_fin, sec_fin] = horario["horario_fin"].split(":").map(part => parseInt(part));
                newList.push({
                    hora_inicio: hora_inicio,
                    hora_fin: hora_fin, 
                    min_inicio: min_inicio,
                    min_fin: min_fin, 
                })
            }
            return newList
        }
        var newJson =  {
            encender: jsonData.encender,
            apagar: jsonData.apagar,
            horarios: convertHorario(jsonData.horarios)
        };

    } catch (error) {

        logs(error)
        res.status(200).send('Error desaguadero', error);
        
    }
    // Escribir el JSON en el archivo
    fs.writeFile(JSON_FILE_DESAGUADERO, JSON.stringify(newJson, null, 2), err => {
        if (err) {
            logs('Error al guardar el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
           logs('Archivo JSON guardado correctamente');
            res.status(200).send('Configuracion de luces desaguadero listo');
        }
    });
});

// Ruta para manejar solicitudes POST
app.post('/luces/modularbox', (req, res) => {
    logs('Configuracion luces modularbox');
    // Obtener el JSON enviado en la solicitud POST
    const jsonData = req.body;
    // Escribir el JSON en el archivo
    fs.writeFile(JSON_FILE_MODULARBOX, JSON.stringify(jsonData, null, 2), err => {
        if (err) {
            logs('Error al guardar el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
           logs('Archivo JSON guardado correctamente');
            res.status(200).send('Configuracion de luces modularbox listo');
        }
    });
});
// Ruta para manejar solicitudes POST
app.post('/luces/campanario', (req, res) => {
    logs('Configuracion luces modularbox');
    // Obtener el JSON enviado en la solicitud POST
    const jsonData = req.body;
    // Escribir el JSON en el archivo
    fs.writeFile(JSON_FILE_CAMPANARIO, JSON.stringify(jsonData, null, 2), err => {
        if (err) {
            logs('Error al guardar el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
           logs('Archivo JSON guardado correctamente');
            res.status(200).send('Configuracion de luces campanario listo');
        }
    });
});

// Ruta para manejar solicitudes GET
app.get('/luces/campanario', (req, res) => {
    // Leer el archivo JSON y enviarlo como respuesta
    fs.readFile(JSON_FILE_CAMPANARIO, 'utf8', (err, data) => {
        if (err) {
            logs('Error al leer el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            logs('Enviado configuracion campanario  correctamente')
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});
// Ruta para manejar solicitudes POST
// app.post('/luces/ermita/color', (req, res) => {
//     logs('Configuracion luces ermita');
//     // Obtener el JSON enviado en la solicitud POST
//     const jsonData = req.body.result;

//     // Escribir el JSON en el archivo
//     fs.writeFile(JSON_FILE, JSON.stringify(jsonData, null, 2), err => {
//         if (err) {
//             logs('Error al guardar el archivo JSON:', err);
//             res.status(500).send('Error interno del servidor');
//         } else {
//            logs('Archivo JSON guardado correctamente');
//             res.status(200).send('Configuracion de luces ermita listo');
//         }
//     });
// });


// Ruta para manejar solicitudes GET
app.get('/luces/ermita', (req, res) => {
    // Leer el archivo JSON y enviarlo como respuesta
    fs.readFile(JSON_FILE_ERMITA, 'utf8', (err, data) => {
        if (err) {
            logs('Error al leer el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            logs('Enviado configuracion correctamente')
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});
// Ruta para manejar solicitudes GET
app.get('/luces/modularbox', (req, res) => {
    // Leer el archivo JSON y enviarlo como respuesta
    fs.readFile(JSON_FILE_MODULARBOX, 'utf8', (err, data) => {
        if (err) {
            logs('Error al leer el archivo JSON:', err);
            res.status(500).send('Error interno del servidor');
        } else {
            logs('Enviado configuracion correctamente')
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        }
    });
});
/// Iniciar el servidor
app.listen(PORT, () => {
  logs('Listo por el puerto, ', PORT);
});

// Importa la biblioteca de Socket.io
const socketio = require('socket.io');
const server = require('http').createServer(app);

// Crea una instancia de Socket.io y pásale el servidor HTTP
const io = socketio(server);

// Maneja la conexión de un cliente
io.on('connection', (socket) => {
  logs('Nuevo cliente conectado');

  // Maneja los mensajes recibidos del cliente
  socket.on('mensaje', (data) => {
    logs('Mensaje recibido:', data);

    // Emite un mensaje de vuelta al cliente
    socket.emit('mensaje', 'Mensaje recibido correctamente');
  });
});

// Escucha en un puerto específico
const PORTSOCKET = 3001;
server.listen(PORTSOCKET, () => {
  logs(`Servidor de sockets escuchando en el puerto ${PORTSOCKET}`);
});