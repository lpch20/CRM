// veterinariosRoutes.js
const express = require('express');
const { veterinarioRegister, confirmar, autenticarLogin } = require('../controllers/veterinarioController');

const router = express.Router();

router.post('/register', veterinarioRegister);
router.get('/confirmar/:token', confirmar) 
router.post('/login', autenticarLogin);

module.exports = router;
