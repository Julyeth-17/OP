const { enviarCorreo } = require('../services/emailService')

exports.enviarCorreo = async (req, res) => {
  const correoData = {
    to: "julieth.h27@gmail.com",
    subject: "¡Hola desde el Grand Line!",
  }
  
  const result = await enviarCorreo(correoData);

  if (result.succes) {
    res.status(200).json("Si se envió :D")
  } else {
    res.status(500).json("Intentelo de nuevo D:")
  }
};

