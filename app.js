//Aqui vamos a crear un servidor con express
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 344;
const csvtojson = require("csvtojson");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Aqui vamos a conectar la base de datos
const mongoose = require('mongoose');
const mongodb = require("mongodb").MongoClient;

const uri = `mongodb://localhost:27017/tienda_melocochosa`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(e => console.log('Error de conexion ', e));

/* // Conexion con mongoDB para conectar subir el archivo csv 
const fs = require("fs");
const fastcsv = require("fast-csv");
let stream = fs.createReadStream("productos.csv");
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data", function (data) {

        csvData.push({
            _id: data[0],
            codigo_producto: data[1],
            nombre_producto: data[2],
            nitproveedor: data[3],
            precio_compra: data[4],
            ivacompra: data[5],
            precio_venta: data[6]
        });

    })
    .on("end", function () {
        // remove the first line: header
        csvData.shift();

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
    stream.pipe(csvStream);
 */




//Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



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