const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./src/routes/usersRouter');

// Configuración del servidor y otros middlewares

// Conexión a la base de datos
mongoose.connect('mongodb://localhost:27017/my_ecommerce_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err.message);
  });

// Usar el router de usuarios en la ruta base '/api/users'
app.use('/api/users', usersRouter);

// Otros middlewares y configuraciones

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
