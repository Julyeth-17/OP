const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PersonajeSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
    tripulacion:
    {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    nacionalidad: {
        type: String,
        required: true
    },
    urlImagen: {
        type: String,
        required: true
    },
    fec_cre: {
        type: Date,
        default: Date.now()
    }
})

PersonajeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Personaje', PersonajeSchema)
