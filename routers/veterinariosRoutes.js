// veterinariosRoutes.js
const express = require('express');
const { veterinarioRegister, confirmar } = require('../controllers/veterinarioController');

const router = express.Router();

router.post('/register', veterinarioRegister);
router.get('/confirmar/:token', confirmar) 

module.exports = router;
