//Aqui vamos a crear un servidor con express
const express = require("express");

// extrae toda la parte del cuerpo de una secuencia de solicitud entrante y la expone en req.body
const bodyParser = require('body-parser');

const app = express();
//Se declara el puerto 344 del localhost
const port = 344;
const path = require('path')

const multer = require('multer');

const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Aqui vamos a conectar la base de datos
const mongoose = require('mongoose');

//URL para conectar con la base de datos
const uri = `mongodb://localhost:27017/tienda_melocochosa`;


mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(e => console.log('Error de conexion ', e));



//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//CSV
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage }) 
app.use(bodyParser.urlencoded({ extended: false }))

//Crea el archivo csv con un nombre y un numero correspondiente al archivo
app.post('/uploadfile', upload.single("uploadfile"), (req, res) => {
    UploadCsvDataToMongoDB(__dirname + '/uploads/' + req.file.filename);
    console.log('CSV arriba ');
});
 
// Conexion con mongoDB para conectar subir el archivo csv 
function UploadCsvDataToMongoDB(filePath) {
    csvtojson()
        .fromFile("productos.csv")
        .then(csvData => {
            console.log(csvData);

            mongodb.connect(
                uri,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err, client) => {
                    if (err) throw err;

                    client
                        .db("tienda_melocochosa")
                        .collection("productos")
                        .insertMany(csvData, (err, res) => {
                            if (err) throw err;

                            console.log(`Inserted: ${res.insertedCount} rows`);
                            client.close();
                        });
                }
            );
        });
}

//Aqui vamos a configurar una carpeta publica de archivos estaticos
//y hacer uso del middleware
app.use(express.static(__dirname + "/public"));
app.use('*/css', express.static('public/css'));
app.use('*/img', express.static('public/img'));


//Aqui colocamos la ruta de las rutas de las diferentes secciones
app.use('/', require('./router/routerweb'));

//Aqui llamamos a clientes.js
app.use('/clientes', require('./router/clientes'));
//Aqui llamamos a productos.js
app.use('/productos', require('./router/productos'));
//Aqui llamamos a reportes.js
app.use('/reportes', require('./router/reportes'));



//Ruta para las paginas no econtradas
app.use((req, res, next) => {
    res.status(404).render("404", {
        titulo: "404",
        descripcion: "Página no encontrada"
    });
});

//Aca escucharemos al servidorExpress
app.listen(port, () => {
    console.log(`Sitio http://localhost:${port}`);
});