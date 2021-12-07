// Aca vamos a crear nuestro modelo de datos para clientes
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Aqui el esquema de datos
const clienteSchema = new Schema({
    Cedula: Number,
    Telefono: Number,
    Nombre: String,
    Correo: String,
    Direccion: String,
    Ventas: String
});

//Creacion del modelo

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;