const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const tasksRoutes = require('./routes/tasks');
const contactoRoutes = require('./routes/contacto');
const axios = require('axios');
const apiKey = 'YOUR_API_KEY'; // Reemplaza con tu clave de API de OpenWeatherMap


const app = express();
app.set('port', 4000);

const nodemailer = require('nodemailer');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: 'main',
}));
app.set('view engine', 'hbs');

app.use(myconnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'abc'
}, 'single'));

app.listen(app.get('port'), () => {
  console.log('Listening on port ', app.get('port'));
});

app.use('/', tasksRoutes);
app.use('/', contactoRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/contacto-confirmacion', (req, res) => {
  res.render('contacto-confirmacion');
});

app.get('/recetas', (req, res) => {
  // Lógica para manejar la solicitud de "/recetas"
  res.render('recetas'); // Renderiza la plantilla "recetas.hbs"
});

app.get('/api/recetas', (req, res) => {
  // Aquí puedes agregar la lógica para obtener las recetas desde tu fuente de datos
  // Por ejemplo, puedes tener una matriz de recetas predefinidas o una base de datos
  const recetas = [
    { nombre: 'Receta 1', descripcion: 'Descripción de la receta 1' },
    { nombre: 'Receta 2', descripcion: 'Descripción de la receta 2' },
    { nombre: 'Receta 3', descripcion: 'Descripción de la receta 3' },
    // Agrega más recetas según sea necesario
  ];

  res.json(recetas);
});