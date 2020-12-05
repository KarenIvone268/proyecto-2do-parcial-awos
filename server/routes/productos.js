const express = require('express');
const _ = require('underscore');
const app = express();
const Productos = require('../models/productos');

app.get('/productos', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Productos.find({ disponible: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        //.populate('usuario', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar los productos',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de productos obtenida con exito',
                conteo: productos.length,
                productos
            });
        });
});

app.post('/productos', function(req, res) {
    let body = req.body;
    let prd = new Productos({
        nombre: body.nombre,
        precioUni: body.precioUni,
        categoria: req.body.categoria,
        usuario: req.body.usuario
    });

    prd.save((err, prdDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            prdDB
        });
    });
});

app.put('/productos/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'categoria']);

    Productos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, prdDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al actualizar productos',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Producto actualizado con exito',
                prdDB
            });
        });
});

app.delete('/productos/:id', function(req, res) {
    let id = req.params.id;
    Productos.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, prdDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar el producto',
                err
            });

        }

        res.json({
            ok: true,
            msg: 'Producto eliminado con exito',
            prdDB
        });
    });
});

module.exports = app;