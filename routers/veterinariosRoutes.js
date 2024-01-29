// veterinariosRoutes.js
const express = require('express');
const { veterinarioRegister, confirmar, autenticarLogin, perfil } = require('../controllers/veterinarioController');
const { verifyToken } = require('../middlewares/tokenAuthorizacion');

const router = express.Router();

router.post('/register', veterinarioRegister);
router.get('/confirmar/:token', confirmar) 
router.post('/login', autenticarLogin);


router.get('/perfil', verifyToken, perfil );

module.exports = router;
