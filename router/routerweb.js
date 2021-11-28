const express = require('express')
const router = express.Router();

//Aqui voy a llamar mi pagina index dinamica
router.get("/", (req, res) => {
    res.render("login");
})

//Aqui voy a llamar mi pagina index dinamica
router.get("/index", (req, res) => {
    res.render("index");
})

//Aqui voy a llamar mi pagina productos dinamica
router.get("/productos", (req, res) => {
    res.render("productos");
});

/* //Aqui voy a llamar mi pagina clientes dinamica
router.get("/clientes", (req, res) => {
    res.render("clientes");
}); */

//Aqui voy a llamar mi pagina ventas dinamica
router.get("/ventas", (req, res) => {
    res.render("ventas");
});

//Aqui voy a llamar mi pagina reportes dinamica
router.get("/reportes", (req, res) => {
    res.render("reportes");
});

//Aqui voy a llamar mi pagina consolidaciones dinamica
router.get("/consolidaciones", (req, res) => {
    res.render("consolidaciones");
});


module.exports = router;