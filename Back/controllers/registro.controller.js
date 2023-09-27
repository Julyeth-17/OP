const Registro = require ("../models/Registro")

exports.crearUsuario = async (req, res) => {
    //console.log(req.body)
    try {
        let registroModel
        registroModel = new Registro(req.body)
        await registroModel.save()
        res.send(registroModel)
    } catch (error) {
        console.log(error)
        res.status(502).send('Oops! Something went wrong')
    }
}

exports.obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const usuariosData = await Registro.find()
        res.json(usuariosData)
    } catch (error) {
        console.log(error)
        res.status(502).send('Oops! Something went wrong')
    }
}

exports.obtenerUnSoloUsuario = async (req, res) => {
    try {
        let regexIdMongo = /^[a-fA-F0-9]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const usuarioData = await Registro.findById(req.params.id)
            if (!usuarioData) {
                res.status(404).send('Usuario no encontrado')
            } else {
                res.json(usuarioData)
            }
        } else {
            res.status(418).send('El Id proporcionado no existe o no es correcto')
        }
    } catch (error) {
        console.log(error)
        res.status(502).send('Oops! Something went wrong')
    }
}
