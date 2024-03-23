// veterinariosRoutes.js
const express = require('express');
const { veterinarioRegister, confirmar, autenticarLogin, perfil, lostPassword, confirmToken, newPassword } = require('../controllers/veterinarioController');
const { verifyToken } = require('../middlewares/tokenAuthorizacion');

const router = express.Router();

// area publica
router.post('/register', veterinarioRegister);
router.get('/confirmar/:token', confirmar) 
router.post('/login', autenticarLogin);
router.post('/lostPassword', lostPassword);
router.get('/lostPassword/:token', confirmToken);
router.put('/lostPassword/:token', newPassword);

//area privada
router.get('/perfil', verifyToken, perfil );

module.exports = router;
