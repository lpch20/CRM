const Paciente = require("../models/Pacientes.js");

const crearPaciente = async (req, res) => {
  const { nombre, propietario, email, fechAlta, sintomas } = req.body;
  console.log(req.userLogin._id);
  const existePaciente = await Paciente.findOne({ nombre: nombre });

  if (existePaciente) {
    res.status(400).json({ message: "El paciente ya se encuentra registrado" });
  } else {
    try {
      const insertUser = Paciente({
        nombre: nombre,
        propietario: propietario,
        email: email,
        sintomas: sintomas,
        veterinario: req.userLogin._id,
      });
      await insertUser.save();

      res.status(200).json({ message: "Paciente registrado correctamente" });
    } catch (error) {
      res.status(404).json({ message: "Error en el servidor", error });
    }
  }
};

const obtenerPaciente = async (req, res) => {
  const { nombre, propietario, email, fechAlta, sintomas } = req.body;
  console.log(req.userLogin._id);
  const existePaciente = await Paciente.findOne({ nombre: nombre });

  if (existePaciente) {
    res.status(400).json({ message: "El paciente ya se encuentra registrado" });
  } else {
    try {
      const insertUser = Paciente({
        nombre: nombre,
        propietario: propietario,
        email: email,
        sintomas: sintomas,
        veterinario: req.userLogin._id,
      });
      await insertUser.save();

      res.status(200).json({ message: "Paciente registrado correctamente" });
    } catch (error) {
      res.status(404).json({ message: "Error en el servidor", error });
    }
  }
};

module.exports = { crearPaciente, obtenerPaciente };
