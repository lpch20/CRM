const jwt = require("jsonwebtoken");
const Veterinario = require("../models/Veterinarios");

exports.verifyToken =  async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
      res.status(401).json({ error: "Acceso al recurso denegado" });
      return;
    }

    console.log(token)
    try {
      const verified = jwt.verify(token,  process.env.JWT);
      req.user = verified;
      req.userLogin = await Veterinario.findById(verified.id_user).select("-password -token -confirmado")
      console.log(req.userLogin);
      next();
    } catch (error) {
      res.status(400).json({ error: "El token es invalido", mensaje: error });
    }
  };