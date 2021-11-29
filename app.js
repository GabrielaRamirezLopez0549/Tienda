//Aqui vamos a crear un servidor con express
const express=require("express");
const bodyParser = require('body-parser');
const app= express();
const port = 344;



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Aqui vamos a conectar la base de datos
const mongoose = require('mongoose');

const uri = `mongodb://localhost:27017/tienda_melocochosa`;
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log ('Conectado a la base de datos'))
.catch(e => console.log('Error de conexion ',e));


//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


//Aqui vamos a configurar una carpeta publica de archivos estaticos
//y hacer uso del middleware
app.use(express.static(__dirname + "/public"));

//Aqui colocamos la ruta de las rutas de las diferentes secciones
app.use('/', require('./router/routerweb'));

//Aqui llamamos a clientes.js
app.use('/clientes', require('./router/clientes'));

//Aca escucharemos al servidorExpress
app.listen(port, ()=>{
    console.log(`Sitio http://localhost:${port}`);
});