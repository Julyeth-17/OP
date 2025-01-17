const Timezone = require("../models/Hora")

exports.obtenerTodasLasZonasHorarias = async (req, res) => {
  const timezones = await Timezone.find();
  res.json(timezones);
  console.log(timezones)
}

exports.agregarZonaHoraria = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'El campo "name" es obligatorio.' });
    }

    const timezone = new Timezone({ name });
    await timezone.save();

    res.status(201).json({ message: 'Zona horaria agregada con éxito.', timezone });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la zona horaria.' });
  }
};

exports.eliminarZonaHoraria = async (req, res) => {
  const { id } = req.params;
  await Timezone.findByIdAndDelete(id);

  res.status(204).send();
}
