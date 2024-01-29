const Veterinario = require("../models/Veterinarios");
const jwt = require('jsonwebtoken');

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
    res.status(404).json({ messsage: "NO SE PUDO REGISTRAR EL  USUARIO", error });
  }
};

const confirmar = async (req, res) => {
  const token = req.params.token;

  const user = await Veterinario.findOne({ token });

  try {
    if (!user) {
      res.status(404).json({ messsage: "cuenta no autenticada" });
    } else {
      user.token = null;
      user.confirmado = true;
      await user.save();
      res.status(200).json({ msg: "cuenta autenticada" });
    }
  } catch (error) {
    res.status(404).json({ messsage: error });
  }

  console.log(token);
};

const autenticarLogin = async (req, res) => {
  const { password, email } = req.body;

  const user = await Veterinario.findOne({ email });

  if (!user) {
   return res
      .status(404)
      .json({ message: "Usuario no registrado, por favor registrate" });
  } else if (!user.confirmado) {
   return res
      .status(404)
      .json({
        message:
          "Usuario no confirmado, por favor ingrese a su mail y confirme su cuenta",
      });

  }

  const token = jwt.sign(
    {
      id_user: user.id,
      username: user.name,
    },
    process.env.JWT
  );
  
  try {
    if (await user.comprobarPassword(password)) {
      res.status(200).json({message: "Acceso correcto", token})
    }else{
      res.status(500).json({message: "Contraseña incorrecta"})
    }
  } catch (error) {
    res.status(400).json({message: "Error en el servidor"})
  } 
};

module.exports = { veterinarioRegister, confirmar, autenticarLogin };
