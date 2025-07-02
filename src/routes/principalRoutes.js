// src/routes/principalRoutes.js
const express = require('express');
const router = express.Router();
const { ejecutarLogout } = require('../controllers/principalController');
const protegerSesion = require('../middlewares/protegerSesion');

// Ruta para cerrar sesión (POST /ssist/sistema/logout)
router.post('/logout', protegerSesion, ejecutarLogout);

module.exports = router;
