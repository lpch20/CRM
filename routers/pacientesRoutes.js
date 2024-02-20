const express = require('express');
const { verifyToken } = require('../middlewares/tokenAuthorizacion');
const { crearPaciente } = require('../controllers/pacienteController');

const router = express.Router();

router.post('/registerPaciente', verifyToken, crearPaciente);


module.exports = router;
