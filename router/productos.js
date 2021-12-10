const express = require ('express');
const router =express.Router();

//Aqui se llama el archivo js de clientes con las variables de la base de datos de productos
const Producto =require('../models/producto');

//Aqui se hace el ruteo, llama los datos de la base de datos y se muestra el ejs de productos con los datos correspondientes
router.get('/', async(req, res)=>{
    try{
        const arrayProductosDB = await Producto.find();
        console.log(arrayProductosDB)
        res.render("productos",{
            arrayProductos: arrayProductosDB
        })
    }catch(error){
        console.log(error)
    }
})




 
module.exports = router;   