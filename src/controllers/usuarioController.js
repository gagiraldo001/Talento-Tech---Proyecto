// src/controllers/usuarioController.js
const bcrypt = require('bcrypt');
const usuarioModel = require('../models/usuarioModel');

/**
 * Devuelve información del usuario con sesión activa.
 */
async function obtenerUsuarioActivo(req, res) {
  if (!req.session?.usuario) return res.status(401).send('No autenticado');

  const { nombre: usuNombre, dni, rol: usuPerfil } = req.session.usuario;

  try {
    const datosEmpleado = await usuarioModel.obtenerDatosEmpleado(dni);

    res.status(200).json({
      usuNombre,
      empNombre: datosEmpleado.empNombre,
      usuPerfil
    });
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    res.status(500).send('Error del servidor');
  }
}

/**
 * Cambia la contraseña de un usuario autenticado,
 * validando su contraseña actual y aplicando hashing a la nueva.
 */
async function cambiarContrasena(req, res) {
  if (!req.session?.usuario) return res.status(401).send('No autenticado');

  const { actual, nueva } = req.body;
  const { dni } = req.session.usuario;

  try {
    const usuario = await usuarioModel.obtenerUsuarioPorDni(dni);
    const coincide = await bcrypt.compare(actual, usuario.usuPassword);
    if (!coincide) return res.status(401).send('Contraseña actual incorrecta');

    const nuevaHash = await bcrypt.hash(nueva, 10);
    await usuarioModel.actualizarPassword(dni, nuevaHash);

    res.send('Contraseña actualizada correctamente');
  } catch (error) {
    console.error('Error al cambiar contraseña:', error.message);
    res.status(500).send('Error al actualizar la contraseña');
  }
}

module.exports = {
  obtenerUsuarioActivo,
  cambiarContrasena
};
