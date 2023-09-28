const express = require('express');
const router = express.Router();
const registroController = require('../controllers/registro.controller')
const personajesController = require('../controllers/onepiece.controller');

router.get('/obtener-personajes', personajesController.obtenerTodosLosPersonajes)
router.get('/buscar-personajes/:id', personajesController.obtenerUnSoloPersonaje)
router.post('/crear-personaje', personajesController.crearPersonaje)
router.put('/actualizar-personaje/:id', personajesController.actualizarPersonaje)
router.delete('/eliminar-personaje/:id', personajesController.eliminarPersonaje)

router.get('/obtener-usuarios/', registroController.obtenerTodosLosUsuarios)
router.get('/obtener-usuario/:id', registroController.obtenerUnSoloUsuario),
router.post('/crear-usuario', registroController.crearUsuario),
router.put('/actualizar-usuario/:id', registroController.actualizarUsuario),
router.delete('/eliminar-usuario/:id', registroController.eliminarUsuario)


module.exports = router

//http://localhost:3000/api/v1/buscar-personaje/64f66ebfc5fcd6bed4ccf11f
