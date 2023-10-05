const mongoose = require('mongoose');
const RegistroSchema = mongoose.Schema({
    correo: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    fec_cre:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Registro', RegistroSchema)
