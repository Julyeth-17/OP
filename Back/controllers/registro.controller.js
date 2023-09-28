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

exports.actualizarUsuario = async (req, res) => {
    try {
        let regexIdMongo = /^[a-fA-F0-9]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const dataUser = await Registro.findById(req.params.id)
            if (!dataUser) {
                res.status(404).send('Usuario no encontrado')
            } else {
                const { correo, usuario, contraseña} = req.body
                dataUser.correo = correo
                dataUser.usuario = usuario
                dataUser.contraseña = contraseña
                let: documentoUpdate = await Registro.findOneAndUpdate({ _id: req.params.id }, dataUser, {new: true})
                res.json(documentoUpdate)
            }
        } else {
            res.status(418).send('El Id proporcionado no existe o no es correcto')
        }
    } catch (error) {
        console.log(error)
        res.status(502).send('Oops! Something went wrong')
    }
}

exports.eliminarUsuario = async (req, res) => {
    try {
        let regexIdMongo = /^[a-fA-F0-9]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const userData = await Registro.findById(req.params.id)
            if (!userData) {
                res.status(404).send('Usuario no encontrado')
                return
            }
        }
        await Registro.findOneAndRemove({ _id: req.params.id })
        res.send('Usuario eliminado')
        {
            
        }
    } catch (error) {
        console.log(error)
        res.status(502).send('Oops! Something went wrong')
    }
}

