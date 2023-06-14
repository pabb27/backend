const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

// Ruta para la vista de contacto
router.get('/contacto', (req, res) => {
  res.render('contacto');
});

// Ruta para enviar la consulta
router.post('/enviar-consulta', (req, res) => {
  // Lógica para enviar la consulta por correo electrónico o guardarla en la base de datos
  // ...

  // Configurar el transportador de correo
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Obtener los datos del formulario de contacto
  const { nombre, celular, direccion, consulta } = req.body;

  // Configurar los datos del correo electrónico
  const mailOptions = {
    from: process.env.SMTP_USERNAME,
    to: process.env.SMTP_USERNAME,
    subject: 'Consulta de contacto',
    text: `
      Nombre y Apellido: ${nombre}
      Celular: ${celular}
      Dirección: ${direccion}
      Consulta: ${consulta}
    `,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo electrónico:', error);
      // Manejar el error de envío de correo
    } else {
      console.log('Correo electrónico enviado:', info.response);
      // Manejar el éxito del envío de correo
    }
  });

  // Redireccionar a una página de confirmación o mostrar un mensaje de éxito
  res.redirect('/contacto-confirmacion');
});

module.exports = router;
