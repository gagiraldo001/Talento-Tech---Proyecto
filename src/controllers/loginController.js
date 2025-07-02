// src/controllers/loginController.js
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

/*
 * Inicia sesión del usuario validando sus credenciales
 * y estableciendo una sesión.
 */
async function login(req, res) {
  const { usuario, password } = req.body;

  try {
    const user = await usuarioModel.buscarUsuarioPorNombre(usuario);
    if (!user) return res.status(401).send('Usuario o contraseña incorrectos, por favor verifique');

    const coincide = await bcrypt.compare(password, user.usuPassword);
    if (!coincide) return res.status(401).send('Usuario o contraseña incorrectos, por favor verifique');

    const estado = await ('Activo' === user.usuEstado);
    if (!estado) return res.status(401).send('Usuario Inactivo, comuniquese con el administrador del sistema');

    req.session.usuario = {
      dni: user.usuEmpDni,
      nombre: user.usuNombre,
      rol: user.usuPerfil,
      estado: user.usuEstado
    };

    res.status(200).send('Ingreso al sistema con exito, Bienvenido...');
  } catch (error) {
    console.error('Error durante el inicio de sesión:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = { login };
