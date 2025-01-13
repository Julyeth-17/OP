const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const EstadosSchema = mongoose.Schema({
  comentario: {
    type: String,
    required: true
  },
  fec_cre: {
    type: Date,
    default: Date.now()
  }
})

EstadosSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Estado', EstadosSchema)
