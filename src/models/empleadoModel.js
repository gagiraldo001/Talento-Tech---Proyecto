// src/models/empleadoModel.js
const db = require('../config/dbConfig');

// Crear empleado

async function crearEmpleado(datos) {
  await db.query(
    'INSERT INTO tblEmpleado (empDni, empNombre, empApellido, empTelefono, empDireccion, empBarrio, empCiudad, empEmail) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [datos.empDni, datos.empNombre, datos.empApellido, datos.empTelefono, datos.empDireccion, datos.empBarrio, datos.empCiudad, datos.empEmail]
  );
}

async function verificarEmpleado(empDni) {
  const [rows] = await db.query(
    'SELECT COUNT(*) AS total FROM tblEmpleado WHERE empDni = ?',
    [empDni]
  );

  return rows[0].total > 0; // Determina si existe empleado con es id (usuEmpDni)
}

// Consulta todos los empleados, devuelve la lista completa

async function listarEmpleados() {
  const [rows] = await db.query(
    'SELECT * FROM tblEmpleado'
  );

  if (rows.length === 0) throw new Error('No existen empleados');
  return rows; // lista de todos los empleados
}

// Funcion para actualizar empleado
async function actualizarEmpleado(empDniOriginal, datos) {

  await db.query(
    'UPDATE tblEmpleado SET empDni = ?, empNombre = ?, empApellido = ?, empTelefono = ?, empDireccion = ?, empBarrio = ?, empCiudad = ?, empEmail = ? WHERE empDni = ?',
    [datos.empDni, datos.empNombre, datos.empApellido, datos.empTelefono, datos.empDireccion, datos.empBarrio, datos.empCiudad, datos.empEmail, empDniOriginal]
  );
}

// Funcion para eliminar empleado

async function eliminarEmpleado(empDni) {
  await db.query(
    'DELETE FROM tblempleado WHERE EmpDni = ?',
    [empDni]
  )
}


module.exports = {
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  listarEmpleados,
  verificarEmpleado
};
