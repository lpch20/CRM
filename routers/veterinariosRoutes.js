// veterinariosRoutes.js
const express = require('express');
const { veterinarioRegister, confirmar, autenticarLogin, perfil, lostPassword, confirmToken, newPassword, editProfile, sendTokenAgain, sendTokenAgainRegister } = require('../controllers/veterinarioController');
const { verifyToken } = require('../middlewares/tokenAuthorizacion');

const router = express.Router();

// area publica
router.post('/register', veterinarioRegister);
router.post('/login', autenticarLogin);
router.post('/lostPassword', lostPassword);
router.get('/confirmar/:token', confirmar) 
router.get('/lostPassword/:token', confirmToken);
router.put('/lostPassword/:token', newPassword);
router.put('/sendTokenAgain', sendTokenAgain);
router.put('/sendTokenAgainRegister', sendTokenAgainRegister);


//area privada
router.get('/perfil', verifyToken, perfil);
router.put('/editProfile/:id', verifyToken, editProfile)

module.exports = router;
