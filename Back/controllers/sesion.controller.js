require('dotenv').config({path: 'config.env'})
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Registro')

exports.generarToken = async (req, res) => {
    const {usuario, password} = req.body

    const user = await Usuario.findOne({usuario: usuario})
    if(!user){
        return res.status(401).json({status: 'El correo es invalido'})
    }

    if(user.password !== password){
        return res.status(401).json({status: 'La contraseña es invalida'})
    }

    const payload = {
        id: usuario._id,
        usuario: usuario.usuario
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {expiresIn: '1h'})
    return res.status(202).json({token: token})

}
