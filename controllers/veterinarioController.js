const Veterinario = require("../models/Veterinarios");

const veterinarioRegister = async (req, res) => {
  const { email, password, name } = req.body;
  const userEmailExist = await Veterinario.findOne({ email });
  const userNameExist = await Veterinario.findOne({ name });

  if (userNameExist || userEmailExist) {
    return res.status(400).json({ message: "USUARIO YA REGISTRADO" });
  }

  try {
    const insertUser = Veterinario(req.body);
    const veterinarioSave = await insertUser.save();

    res.status(200).json({ message: "USUARIO REGISTRADO" });
  } catch (error) {
    res.status(404).json({ messsage: "NO SE PUDO REGISTRAR EL  USUARIO" });
  }
};

const confirmar = (req, res) => {
  const token = req.params;

  console.log(token);
  res.json({ msg: 'confirmando cuenta' });
  
}

module.exports = {veterinarioRegister, confirmar};
