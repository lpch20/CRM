const express = require('express');
const { verifyToken } = require('../middlewares/tokenAuthorizacion');
const { crearPaciente, obtenerPaciente, eliminarPaciente, modificarPaciente, obtenerAllPaciente } = require('../controllers/pacienteController');

const router = express.Router();

router.post('/registerPaciente', verifyToken, crearPaciente);
router.get('/obtenerAllPaciente', verifyToken, obtenerAllPaciente);
router.get('/obtenerPaciente/:id',verifyToken, obtenerPaciente);
router.put('/modificarPaciente/:id',verifyToken,modificarPaciente);
router.delete('/eliminarPaciente/:id',verifyToken,eliminarPaciente);


module.exports = router;
