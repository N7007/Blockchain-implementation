const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
let usuario = null;

const validarUsuario = (req, res, next) => {
    if (!usuario) {
        res.status(401).redirect("/401");
    } else {
        usuario = null;
        next();
    }
};

app.use(express.static("../public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/pages/index.html"));
});

app.get("/finalizado", validarUsuario, (req, res) => {
    if (!usuario.haVotado) {
        res.redirect("/votacion");
    } else {
        usuario = null;
        next(); 
    }
});

app.get("/:nombrePagina", (req, res, next) => {
    const rutaPagina = path.join(__dirname, "/pages", `${req.params.nombrePagina}.html`);    

    fs.access(rutaPagina, fs.constants.F_OK, (err) => {
        err
        ? next()
        : res.sendFile(rutaPagina);
    })
});

app.post("/identificacion", (req, res) => {
    console.log(req.body);
    usuario = req.body;
    console.log(usuario);
    res.redirect("/votacion");
})

app.post("/votacion", validarUsuario, (req, res) => {
    usuario.haVotado = true;
    res.redirect("/finalizado");
});

app.use((req, res) => {
    const ruta404 = path.join(__dirname, "/pages/404.html");
    res.sendFile(ruta404);
});

const server = app.listen(5000);
const portNumber = server.address().port;
console.log(`Puerto abierto en ${portNumber}`);