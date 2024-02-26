const fs = require('fs');

function escribirLog(mensaje) {
  // Obtener la fecha actual
  const fechaActual = new Date().toISOString();

  // Formatear el mensaje de log
  const logFormatado = `${fechaActual} - ${mensaje}\n`;

  // Escribir el log en el archivo
  fs.appendFile('archivo_de_logs.txt', logFormatado, (error) => {
    if (error) {
      console.error('Error al escribir el log:', error);
    }
  });
}

module.exports = escribirLog;
