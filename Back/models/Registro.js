const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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

RegistroSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Registro', RegistroSchema)
