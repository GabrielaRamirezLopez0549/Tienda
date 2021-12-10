const express = require ('express');
const router =express.Router();


//Aqui se llama el archivo js de clientes con las variables de la base de datos de clientes
const Cliente =require('../models/cliente');

//Aqui se hace el ruteo, llama los datos de la base de datos y se muestra el ejs de reportes con los datos correspondientes
//Para reportes es necesario llamar los clientes, ya que solo es la informacion de los clientes creados en un reporte
router.get('/', async(req, res)=>{
    try{
        const arrayClientesDB = await Cliente.find();
        console.log(arrayClientesDB)
        res.render("reportes",{
            arrayClientes: arrayClientesDB
        }) 
    }catch(error){
        console.log(error)
    } 
})

module.exports = router;
