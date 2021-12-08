const express = require('express')
const router = express.Router();
const passport = require('passport');
const cookie = require('cookie-parser');
const session = require('express-session');
const passportlocal = require('passport-local').Strategy;


router.use(express.urlencoded({ extended: true }));
router.use(cookie('Mi ultra secreto'));
router.use(session({
    secret: 'Mi ultra secreto',
    resave: true,
    saveUninitialized: true
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new passportlocal(function (username, password, done) {

    if (username === "12" && password === "12")
        return done(null, { id: 1, name: "Cody" });

    done(null, false);



}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    done(null, { id: 1, name: "Cody" });
})


//Aqui voy a llamar mi pagina index dinamica
router.get("/", (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}, (req, res) => {
    res.redirect('/index');
})

//Aqui voy a mostrar formulario de login
router.get("/login", (req, res) => {
    res.render("login");
})

//Recibir credenciales e iniciar sesion
router.post("/login", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login"
}));


//Aqui voy a llamar mi pagina index dinamica
router.get("/index", (req, res) => {
    res.render("index");
})

/*  //Aqui voy a llamar mi pagina productos dinamica
router.get("/productos", (req, res) => {
    res.render("productos");
});  */

//Aqui voy a llamar mi pagina ventas dinamica
router.get("/ventas", (req, res) => {
    res.render("ventas");
});

/* //Aqui voy a llamar mi pagina reportes dinamica
router.get("/reportes", (req, res) => {
    res.render("reportes");
}); */

//Aqui voy a llamar mi pagina consolidaciones dinamica
router.get("/consolidaciones", (req, res) => {
    res.render("consolidaciones");
});



module.exports = router;