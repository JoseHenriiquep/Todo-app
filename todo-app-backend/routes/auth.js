const express = require('express');
const { registerUser, login } = require('../controllers/authController');

//Chamando o Router do express
const router = express.Router();

//Rotas para o usuário
router.post('/register', registerUser);
router.post('/login', login)

module.exports = router;