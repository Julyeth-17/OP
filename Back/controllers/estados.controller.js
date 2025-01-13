const Estado = require("../models/Estado")

exports.crearEstado = async (req, res) => {
  try {
    let estadoModel
    estadoModel = new Estado(req.body)
    await estadoModel.save()
    res.json(estadoModel)
  } catch (error) {
    console.log(error)
    res.status(502).json({ response: 'Oops! Something went wrong' })
  }
}

exports.obtenerTodosLosEstados = async (req, res) => {
  try {
    const estadosRegistrados = await Estado.find({})
    res.json(estadosRegistrados)
  } catch (error) {
    console.log(error)
    res.status(502).json({ response: 'Oops! Something went wrong' })
  }

  exports.obtenerUnEstado = async (req, res) => {
    try {
      let regexIdMongo = /^[a-fA-F0-9]{24}$/
      if (regexIdMongo.test(req.params.id)) {
        const estadoData = await Estado.findById(req.params.id)
        if (!estadoData) {
          res.status(404).json({ respose: 'Estado no encontrado' })
        } else {
          res.json(estadoData)
        }
      } else {
        res.status(418).json({ respose: 'El Id proporcionado no existe o no es correcto' })
      }
    } catch (error) {
      console.log(error)
      res.status(502).json({ respose: 'Oops! Something went wrong' })
    }
  }

  exports.actualizarEstado = async (req, res) => {
    try {
      let regexIdMongo = /^[a-fA-F0-9]{24}$/
      if (regexIdMongo.test(req.params.id)) {
        const estadoData = await Estado.findById(req.params.id)
        if (!estadoData) {
          res.status(404).json({ respose: 'Estado no encontrado' })
        } else {
          const comentario = req.body
          estadoData.comentario = comentario
          let estadoUpdate = await Estado.findOneAndUpdate({ _id: req.params.id }, estadoData, { new: true })
          res.json(estadoUpdate)
        }
      } else {
        res.status(418).json({ respose: 'El Id proporcionado no existe o no es correcto' })
      }
    } catch (error) {
      console.log(error)
      res.status(502).json({ respose: 'Oops! Something went wrong' })
    }
  }

  exports.eliminarEstado = async (req, res) => {
    try {
        let regexIdMongo = /^[a-fA-F0-9]{24}$/
        if (regexIdMongo.test(req.params.id)) {
            const estadoData = await Registro.findById(req.params.id)
            if (!estadoData) {
                res.status(404).json({ respose: 'Estado no encontrado' })
                return
            }
        }
        await Estado.findOneAndRemove({ _id: req.params.id })
        res.json({ respose: 'Usuario eliminado' })
        { }
    } catch (error) {
        console.log(error)
        res.status(502).json({ respose: 'Oops! Something went wrong' })
    }
  }
}
