const Personaje = require('../models/Personajes');

exports.crearPersonaje = async (req, res) => {
    //console.log(req.body)
    try {
        let personajeModel
        personajeModel = new Personaje(req.body)
        await personajeModel.save()
        res.json(personajeModel)
    } catch (error) {
        console.log(error)
        res.status(502).json({response: 'Oops! Something went wrong'})
    }
}

exports.obtenerTodosLosPersonajes = async (req, res) => {
    try {
        const personajesData = await Personaje.find()
        res.json(personajesData)
    } catch (error) {
        console.log(error)
        res.status(502).json({response: 'Oops! Something went wrong'})
    }
}

exports.obtenerUnSoloPersonaje = async (req, res) => {
    try {
        let regexIdMongo = /^[a-fA-F0-9]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const personajeData = await Personaje.findById(req.params.id)
            if (!personajeData) {
                res.status(404).json({response:'Personaje no encontrado'})
            } else {
                res.json(personajeData)
            }
        } else {
            res.status(418).json({response:'El Id proporcionado no existe o no es correcto'})
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({response: 'Oops! Something went wrong'})
    }
}

exports.actualizarPersonaje = async (req, res) => {
    try {
        let regexIdMongo = /^[a-fA-F0-9]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const personajeData = await Personaje.findById(req.params.id)
            if (!personajeData) {
                res.status(404).json({response: 'Personaje no encontrado'})
            } else {
                const { nombre, edad, rol, tripulacion, nacionalidad, urlImagen } = req.body
                personajeData.nombre = nombre
                personajeData.edad = edad
                personajeData.tripulacion = tripulacion
                personajeData.rol = rol
                personajeData.nacionalidad = nacionalidad
                personajeData.urlImagen = urlImagen
                let: documentoActualizado = await Personaje.findOneAndUpdate({ _id: req.params.id }, personajeData, {new: true})
                res.json(documentoActualizado)
            }
        } else {
            res.status(418).json({response:'El Id proporcionado no existe o no es correcto'})
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({response:'Oops! Something went wrong'})
    }
}

exports.eliminarPersonaje = async (req, res) => {
    try {
        let regexIdMongo = /^[a-fA-F0-9]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const personajeData = await Personaje.findById(req.params.id)
            if (!personajeData) {
                res.status(404).json({response:'Personaje no encontrado'})
                return
            }
        }
        await Personaje.findOneAndRemove({ _id: req.params.id })
        res.json({response:'Personaje eliminado'})
        {
            
        }
    } catch (error) {
        console.log(error)
        res.status(502).json({response: 'Oops! Something went wrong'})
    }
}
