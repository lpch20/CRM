const express = require('express');
const { addPaciente } = require('../controllers/pacientesController');

const router = express.Router()

router.get('/pacientes', addPaciente)

module.exports = router;