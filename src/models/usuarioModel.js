// src/models/usuarioModel.js
const db = require('../config/dbConfig');

/**
 * Consulta los datos del empleado por su DNI.
 * Devuelve nombre completo, útil para la UI.
 */
async function obtenerDatosEmpleado(dni) {
  const [rows] = await db.query(
    'SELECT empNombre FROM tblEmpleado WHERE empDni = ?',
    [dni]
  );

  if (rows.length === 0) throw new Error('Empleado no encontrado');
  return rows[0]; // { empNombre }
}

/**
 * Devuelve usuario completo al buscarlo por nombre.
 * Usado durante login.
 */
async function buscarUsuarioPorNombre(nombreUsuario) {
  const [rows] = await db.query(
    'SELECT * FROM tblUsuario WHERE usuNombre = ?',
    [nombreUsuario]
  );

  return rows[0] || null;
}

/**
 * Obtiene la contraseña actual del usuario por DNI.
 * Para validación previa a cambio de contraseña.
 */
async function obtenerUsuarioPorDni(dni) {
  const [rows] = await db.query(
    'SELECT usuPassword FROM tblUsuario WHERE usuEmpDni = ?',
    [dni]
  );

  return rows[0]; // { usuPassword }
}

/**
 * Actualiza la contraseña de un usuario con hash ya aplicado.
 */
async function actualizarPassword(dni, nuevaHash) {
  await db.query(
    'UPDATE tblUsuario SET usuPassword = ? WHERE usuEmpDni = ?',
    [nuevaHash, dni]
  );
}

module.exports = {
  obtenerDatosEmpleado,
  buscarUsuarioPorNombre,
  obtenerUsuarioPorDni,
  actualizarPassword
};
