const express = require('express');
const { verifyToken } = require('../middlewares/tokenAuthorizacion');
const { crearPaciente, obtenerPaciente } = require('../controllers/pacienteController');

const router = express.Router();

router.post('/registerPaciente', verifyToken, crearPaciente);
router.get('/obtenerPaciente',verifyToken,obtenerPaciente);


module.exports = router;
