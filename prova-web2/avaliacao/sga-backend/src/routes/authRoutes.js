
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuthenticated = require('../middlewares/authMiddleWare');

// Cadastro de novo usuário
router.post('/register', authController.register); 

// Login de usuário
router.post('/login', authController.login);       

// Logout de usuário
router.post('/logout', authController.logout);    

// 3. Consulta: Obter dados do usuário logado (protegido)
router.get('/me', isAuthenticated, authController.getLoggedInUser); 

module.exports = router;