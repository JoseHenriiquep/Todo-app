const express = require('express');
const { registerUser, login } = require('../controllers/authController');

const router = express.Router();

//Rotas para o usuário
router.post('/register', registerUser);
router.post('/login', login)

module.exports = router;