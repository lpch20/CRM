const Paciente = require("../models/Pacientes.js");

const crearPaciente = async (req, res) => {
  const { name, propietario, email, fecha, sintomas } = req.body;

  console.log(name);
  console.log(req.userLogin._id);

  try {
    const existePaciente = await Paciente.findOne({ name: name });

    if (existePaciente) {
      return res
        .status(400)
        .json({ error: "El paciente ya se encuentra registrado" });
    } else {
      const nuevoPaciente = new Paciente({
        name: name,
        propietario: propietario,
        email: email,
        sintomas: sintomas,
        veterinario: req.userLogin._id,
        fecha: fecha,
      });

      await nuevoPaciente.save();

      return res
        .status(200)
        .json({ message: "Paciente registrado correctamente" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error en el servidor", message: error.message });
  }
};

module.exports = crearPaciente;

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;

  console.log(id)

  try {
    const pacientes = await Paciente.findById(id);
    if (pacientes.veterinario._id.toString() !== req.userLogin._id.toString()) {
      res.status(400).json({ message: "No se encuentra el paciente" });
    } else {
      res.status(200).json({ message: "Paciente encontrados", pacientes });
    }
  } catch (error) {
    res.status(404).json({ message: "Error en el servidor", error });
  }
};

const obtenerAllPaciente = async (req, res) => {
  try {
    const pacientesAll = await Paciente.find({
      veterinario: req.userLogin._id,
    });

    console.log([pacientesAll]);
    if (!pacientesAll) {
      res.status(400).json({ error: "No se encuentra el paciente" });
    }

    res.status(200).json({ message: "Paciente encontrados", pacientesAll });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

const modificarPaciente = async (req, res) => {
  const { id } = req.params;

  console.log("EL FUCKING", id)
  const {
    newName,
    newPropietario,
    newEmail,
    newFechaAlta,
    newSintomas,
  } = req.body;

  
  try {
    const paciente = await Paciente.findById(id);

    console.log(paciente);

    if (!paciente) {
      return res.status(404).json({ message: "No se encuentra el paciente" });
    }

    if (
      paciente.veterinario &&
      paciente.veterinario._id.toString() !== req.userLogin._id.toString()
    ) {
      return res
        .status(400)
        .json({ message: "No tienes permiso para modificar este paciente" });
    }

    paciente.nombre = !newName ? (paciente.nombre = paciente.nombre) : newName;
    paciente.propietario = !newPropietario
      ? (paciente.propietario = paciente.propietario)
      : newPropietario;
    paciente.email = !newEmail ? (paciente.email = paciente.email) : newEmail;
    paciente.fechaAlta = !newFechaAlta
      ? (paciente.fechAlta = paciente.fechAlta)
      : newFechaAlta;
    paciente.sintomas = !newSintomas
      ? (paciente.sintomas = paciente.sintomas)
      : newSintomas;
    paciente.fechaAlta = !newFechaAlta
      ? (paciente.fechaAlta = paciente.fechaAlta)
      : Date.now();

    const pacienteActualizado = await paciente.save();

    console.log(pacienteActualizado);
    res
      .status(200)
      .json({ message: "Paciente modificado", pacienteActualizado });
  } catch (error) {
    console.error("Error al modificar paciente:", error);
    res.status(500).json({ message: "Error en el servidor", error: error.message });
    
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
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar este paciente" });
    }

    await paciente.deleteOne();
    res.status(200).json({ message: "Paciente eliminado correctamente" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

module.exports = {
  crearPaciente,
  obtenerPaciente,
  eliminarPaciente,
  modificarPaciente,
  obtenerAllPaciente,
};
