// src/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const {
  obtenerUsuarioActivo,
  cambiarContrasena,
} = require('../controllers/usuarioController');

const protegerSesion = require('../middlewares/protegerSesion');

// Ruta para obtener datos del usuario autenticado (GET /ssist/usuario/usuario-activo)
router.get('/usuario-activo', protegerSesion, obtenerUsuarioActivo);

// Ruta para cambiar contraseña (PUT /ssist/usuario/cambiar-contrasena)
router.put('/cambiar-contrasena', protegerSesion, cambiarContrasena);

module.exports = router;
