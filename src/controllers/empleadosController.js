// empleadosController

const {
  crearEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  listarEmpleados,
  verificarEmpleado
} = require('../models/empleadoModel');

// Crear un nuevo empleado
async function controllerCrearEmpleado(req, res) {
  const datos = req.body;

  try {
    const existe = await verificarEmpleado(datos.empDni);
    if (existe) {
      return res.status(409).json({ error: 'El empleado ya está registrado con ese número de identificación.' });
    }

    await crearEmpleado(datos);
    res.status(201).json({ mensaje: 'Empleado creado exitosamente' });
  } catch (error) {
    console.error('Error al crear empleado:', error.message);
    res.status(500).json({ error: 'Error al registrar empleado.' });
  }
}

// Obtener todos los empleados
async function controllerListarEmpleados(req, res) {
  try {
    const empleados = await listarEmpleados();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// Actualizar un empleado
async function controllerActualizarEmpleado(req, res) {
  const empDniOriginal = req.params.empDni;
  const datos = req.body;

  try {
    if (datos.empDni !== empDniOriginal) {
      const existe = await verificarEmpleado(datos.empDni);
      if (existe) {
        return res.status(409).json({ error: 'Si está intentando actualizar el documento del empleado, este ya se encuentra registrado.' });
      }
    }

    await actualizarEmpleado(empDniOriginal, datos);
    res.status(200).json({ mensaje: 'Empleado actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar empleado:', error.message);
    res.status(500).json({ error: 'No se pudo actualizar el empleado' });
  }
}

// Eliminar un empleado
async function controllerEliminarEmpleado(req, res) {
  const empDni = req.params.empDni;

  try {
    await eliminarEmpleado(empDni);
    res.status(200).json({ mensaje: 'Empleado eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar empleado:', error.message);
    res.status(500).json({ error: 'No se pudo eliminar el empleado' });
  }
}

module.exports = {
  controllerCrearEmpleado,
  controllerListarEmpleados,
  controllerActualizarEmpleado,
  controllerEliminarEmpleado
};
