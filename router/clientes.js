const express = require('express')
const router = express.Router();


const Cliente = require('../models/cliente');
router.get('/',async(req,res)=>{
    try{
        const arrayClientesDB = await Cliente.find();
        console.log(arrayClientesDB)
        res.render("clientes",{
            arrayClientes:arrayClientesDB 
        })
    } catch (error){
        console.log(error);
    }
});

//Aqui vamos a transportar las cajas de la pagina dinamica a las base de datos
router.post('/',async (req,res)=>{
    const body = req.body
    console.log(body)
    try{
        //Primer metodo
        const clientedb = new Cliente(body)
        await clientedb.save() 

       /*  //Segundo 
        
        await Cliente.create(body)
        console.log(body) */
    }catch(error){
        console.log('Error',error)
    }
})



module.exports = router;