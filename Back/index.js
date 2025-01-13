const express = require('express');
const conectarDB = require('./config/db')
const cors = require('cors')

const app = express();
conectarDB()
app.use(cors())
app.use(express.json());

// requestHandler, configuracion visual para el dev, para que la api pueda comunicarse con el otro archivo para las rutas
app.use('/api/v1', require('./routes/routes'))

// se define rutas o endpoints, se llama de las librerias el get.
app.listen(3000, () => {
  console.log('La aplicacion se esta ejecutando')
})


