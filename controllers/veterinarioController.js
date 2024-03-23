const Veterinario = require("../models/Veterinarios");
const jwt = require("jsonwebtoken");
const tokenId = require("../helpers/tokenId");
const emailRegister = require("../helpers/sendEmailRegister");
const emailPasswordRecovery = require("../helpers/sendEmailPasswordRecovery");


const veterinarioRegister = async (req, res) => {
  const { email, password, name } = req.body;
  const userEmailExist = await Veterinario.findOne({ email });
  const userNameExist = await Veterinario.findOne({ name });

  if (userNameExist || userEmailExist) {
    return res.status(400).json({ error: "USUARIO YA REGISTRADO" });
  }

  try {
    const insertUser = Veterinario(req.body);
    const veterinarioSave = await insertUser.save();

    //ENVIO DE EMAIL CON NODEMAILER

    emailRegister({email, name, token: veterinarioSave.token})

    res.status(200).json({ message: "USUARIO REGISTRADO" });
  } catch (error) {
    res
      .status(404)
      .json({ messsage: "NO SE PUDO REGISTRAR EL  USUARIO", error });
  }
};

const confirmar = async (req, res) => {
  const token = req.params.token;

  const user = await Veterinario.findOne({ token });

  try {
    if (!user) {
      res.status(400).json({ error: "cuenta no autenticada" });
    } else {
      res.status(200).json({ msg: "cuenta autenticada" });
      await user.save();
      user.token = null;
      user.confirmado = true;
      await user.save();
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
      .json({ error: "Usuario no registrado, por favor registrate" });
  } else if (!user.confirmado) {
    return res.status(404).json({
      error:
        "Usuario no confirmado, por favor ingrese a su mail y confirme su cuenta",
    });
  }

  const token = jwt.sign(
    {
      id_user: user.id,
      username: user.name,
    },
    process.env.JWT,
    { expiresIn: "1h" }
  );

  try {
    if (await user.comprobarPassword(password)) {
      res.status(200).json({ message: "Acceso correcto", token });
    } else {
      res.status(500).json({ error: "Contraseña incorrecta" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error en el servidor" });
  }
};

const perfil = async (req, res) => {
  const perfil = req.userLogin;

  res.status(200).json({ message: "Acceso correcto", perfil });
};

const lostPassword = async (req, res) => {
  const { email } = req.body;

  console.log(email)

  const user = await Veterinario.findOne({ email });

  if (!user) {
    return res
      .status(400)
      .json({ error: "Email no existe, porfavor registrate" });
  }

  try {
    user.token = tokenId();
    user.confirmado = false;

    const datos = {
      email: user.email,
      name: user.name,
      token: user.token
    }

    await user.save();
    emailPasswordRecovery(datos)
    res.status(200).json({ message: "Revise su mail" });
  } catch (error) {
    res.status(404).json({ error });
  }
};

const confirmToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Veterinario.findOne({ token });

  if (!tokenValido) {
    res.status(400).json({ message: "Token no valido" });
  } else {
    res.status(200).json({ message: "Token valido" });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password }  = req.body;

  console.log(req.body)
  console.log(req.params.token[0])

  const user = await Veterinario.findOne({ token });
  if (!user) {
    res.status(400).json({ error: "No podras recuperar tu contraseña sin antes recibir un correo" });
  } else {

    try {
      user.password = password;
      user.token = null;
      user.confirmado = true;
      await user.save();
      res.status(200).json({ message: "Contrasena cambiada correctamente" });
    } catch (error) {
      res.status(404).json({ error });
    }
  }

};

module.exports = {
  veterinarioRegister,
  confirmar,
  autenticarLogin,
  perfil,
  lostPassword,
  confirmToken,
  newPassword
};
