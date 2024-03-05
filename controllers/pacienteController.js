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
  const { id } = req.params;

  const pacientes = await Paciente.findById(id);

  try {
    if (pacientes.veterinario._id.toString() !== req.userLogin._id.toString()) {
      res.status(400).json({ message: "No se encuentra el paciente" });
    } else {
      res.status(200).json({ message: "Paciente encontrados", pacientes });
    }
  } catch (error) {
    res.status(404).json({ message: "Error en el servidor", error });
  }
};

const modificarPaciente = async (req, res) => {
  const { id } = req.params;
  const {
    newName,
    newPropietario,
    newEmail,
    newFechaAlta,
    newSintomas,
    newVeterinario,
  } = req.body;

  try {
    const paciente = await Paciente.findById(id);

    if (!paciente) {
      return res.status(404).json({ message: "No se encuentra el paciente" });
    }

    if (paciente.veterinario && paciente.veterinario._id.toString() !== req.userLogin._id.toString()) {
      return res.status(400).json({ message: "No tienes permiso para modificar este paciente" });
    }

    paciente.nombre = !newName ? paciente.nombre = paciente.nombre : newName;
    paciente.propietario =  !newPropietario ? paciente.propietario = paciente.propietario : newPropietario;
    paciente.email = !newEmail ? paciente.email = paciente.email : newEmail;
    paciente.fechaAlta = !newFechaAlta ? paciente.fechAlta = paciente.fechAlta : newFechaAlta;
    paciente.sintomas = !newSintomas ? paciente.sintomas = paciente.sintomas : newSintomas;
    paciente.veterinario = !newVeterinario ? paciente.veterinario = paciente.veterinario : newPropietario;
    paciente.fechaAlta = !newFechaAlta ? paciente.fechaAlta = Date.now() : Date.now();

    const pacienteActualizado = await paciente.save();
    res.status(200).json({ message: "Paciente modificado", pacienteActualizado });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};


const eliminarPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const paciente = await Paciente.findById(id);

    if (!paciente) {
      return res.status(404).json({ message: "No se encuentra el paciente" });
    }

    if (paciente.veterinario._id.toString() !== req.userLogin._id.toString()) {
      return res.status(403).json({ message: "No tienes permiso para eliminar este paciente" });
    }

    await paciente.deleteOne();
    res.status(200).json({ message: "Paciente eliminado correctamente" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
  }
};


module.exports = {
  crearPaciente,
  obtenerPaciente,
  eliminarPaciente,
  modificarPaciente,
};
