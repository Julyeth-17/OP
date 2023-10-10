const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registro.controller');
const personajesController = require('../controllers/onepiece.controller');
const sesionController = require('../controllers/sesion.controller');
const mdjwt = require('../middleware/jwt');

// router.get('/obtener-personajes/:pagina/:limite', personajesController.obtenerTodosLosPersonajes)
router.post('/obtener-personajes', personajesController.obtenerTodosLosPersonajes)
router.get('/buscar-personajes/:id', personajesController.obtenerUnSoloPersonaje)
router.post('/crear-personaje', personajesController.crearPersonaje)
router.put('/actualizar-personaje/:id', personajesController.actualizarPersonaje)
router.delete('/eliminar-personaje/:id', personajesController.eliminarPersonaje)


router.post('/obtener-usuarios/', mdjwt.verificarToken, registroController.obtenerTodosLosUsuarios)
router.get('/obtener-usuario/:id', mdjwt.verificarToken, registroController.obtenerUnSoloUsuario),
router.post('/crear-usuario', registroController.crearUsuario),
router.put('/actualizar-usuario/:id', registroController.actualizarUsuario),
router.delete('/eliminar-usuario/:id', registroController.eliminarUsuario)

router.post('/ingreso', sesionController.generarToken)

module.exports = router

//http://localhost:3000/api/v1/buscar-personaje/64f66ebfc5fcd6bed4ccf11f

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTY1NDYwMjgsImV4cCI6MTY5NjU0OTYyOH0.q7IxxwMJXEltjAXF7Fu9j9tqL4akbYDmX6hDo6ASFts
