require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('<h1> BIENVENIDO A MI SERVIDOR REST </h1>');
});

app.get('/usuario', function(req, res) {
    res.json({
        ok: 200,
        mensaje: 'Usuarios consultados con exito'
    });
});

app.post('/usuario', function(req, res) {
    let nombre = req.body.nombre;
    let body = req.body;

    if (nombre == undefined) {
        res.status(400).json({
            ok: 400,
            mensaje: 'Favor de enviar el valor del nombre'
        });
    } else {

        res.json({
            ok: 200,
            mensaje: 'Usuario insertado con exito',
            body: body
        });
    }
});

app.put('/usuario/:id/:nombre', function(req, res) {
    let id = req.params.id
    let nombre = req.params.nombre;

    res.json({
        ok: 200,
        mensaje: 'Usuario actualizado con exito',
        id: id,
        nombre: nombre
    })
});

app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    res.json({
        ok: 200,
        mensaje: 'Usuario eliminado con exito',
        id: id
    })
});

app.listen(process.env.PORT, () => {
    console.log('El servidor esta en linea en el puerto ', process.env.PORT);
});