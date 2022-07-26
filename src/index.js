const express = require('express');
const morgan = require('morgan')
const path = require('path');

const { mongoose } = require('./database');

const app = express();


//configuración
app.set('port', process.env.PORT || 3000)

//Middlewares: Funciones se ejecutan antes de las rutas
app.use(morgan('dev')); // ver por consola las peticiones
app.use(express.json()); //comprueba si el dato es formato json

//Rutes: Rutas URLS
app.use('/api/tareas', require('./routes/task.routes'));

//Static files
//console.log(path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en puerto ${app.get('port')}`);
}
);
