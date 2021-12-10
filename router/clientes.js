const express = require ('express');
const router =express.Router();

//Aqui se llama el archivo js de clientes con las variables de la base de datos de clientes
const Cliente =require('../models/cliente');

//Aqui se hace el ruteo, llama los datos de la base de datos y se muestra el ejs de clientes con los datos correspondientes
router.get('/', async(req, res)=>{
    try{
        const arrayClientesDB = await Cliente.find();
        console.log(arrayClientesDB)
        res.render("clientes",{
            arrayClientes: arrayClientesDB
        })
    }catch(error){
        console.log(error)
    } 
})




//Aqui  vamos a transportar los datos de las cajas de la página dinámica a la base de datos  
router.post('/', async(req, res)=>{
    const body = req.body
    
    try{
        const clienteDB = new Cliente(body)
        await clienteDB.save()
        //await Cliente.create(body)

        console.log(body) 
        res.redirect('clientes')
    }catch(error){
        console.log('error ', error)
    }
})

// Aqui vamos a crear el detalle del cliente para editar y borrar
router.get('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const clienteDB = await Cliente.findOne({_id:id})
        console.log(clienteDB)
        res.render('detalle',{
            cliente : clienteDB,
            error : false
        })
    } catch (error) {
        res.render('detalle',{
            error : true,
            mensaje : 'No se encuentra el id escogido'})
    }
})
 //Aqui vamos a crear el barrado de los clientes  con delete
 router.delete('/:id', async(req, res)=>{
    const id = req.params.id
    try {
        const clienteDB = await Cliente.findByIdAndDelete({_id: id})
        if (clienteDB) {
            res.json({
                
                estado: true,
                mensaje : 'Eliminado !!'
            })
        } else {
            res.json({
                estado: false,
                mensaje : 'No se pudo eliminar !!'
            })
        }
    } catch (error) {
        console.log(error)
    }
 })

 //Aquí vamos a crear la ruta de editar los arrayClientesDB
 router.put('/:id', async(req, res)=>{
     
    const id = req.params.id
    const body = req.body
    try {
        const clienteDB = await Cliente.findByIdAndUpdate(
            id, body, {useFindAndModify: false})
            console.log(clienteDB)
            console.log('Entra hasta el try')
            res.json({
                estado : true,
                mensaje : 'Cliente Editado'
            })
            
    } catch (error) {
        res.json({
            estado : false,
            mensaje : 'Fallo al Editar'
        })
        console.log(error)
    }
 })
module.exports = router;   