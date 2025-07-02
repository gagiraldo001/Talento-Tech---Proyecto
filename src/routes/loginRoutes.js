// src/routes/loginRoutes.js
const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Ruta para iniciar sesión (POST /ssist/auth/login)
router.post('/login', loginController.login);

module.exports = router;
