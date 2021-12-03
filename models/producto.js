// Aca vamos a crear nuestro modelo de datos para producto
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Aqui el esquema de datos
const productosSchema = new Schema({
    codigo_producto: Number,
    nombre_producto: String,
    nitproveedor: Number,
    precio_compra: Number,
    ivacompra: Number,
    precio_venta: Number
});

//Creacion del modelo

const Producto= mongoose.model('Producto',productosSchema);

module.exports = Producto;