// src/routes/principalRoutes.js
const express = require('express');
const router = express.Router();
const { controllerCrearEmpleado, controllerListarEmpleados, controllerActualizarEmpleado, controllerEliminarEmpleado} 
= require('../controllers/empleadosController');

const protegerSesion = require('../middlewares/protegerSesion');

// Rutas para empleados
router.use(protegerSesion);

// Ruta para crear empleados
router.post('/crear-empleado', controllerCrearEmpleado);

// Ruta para obtener lista de los empleados)
router.get('/lista-empleados', controllerListarEmpleados);

// Ruta para actualizar empleados
router.put('/actualizar-empleado/:empDni', controllerActualizarEmpleado);

// Ruta para eliminar empleados
router.delete('/eliminar-empleado/:empDni', controllerEliminarEmpleado);

/*
// Ruta para crear empleados
router.post('/crear-empleado', protegerSesion, crearEmpleado);

// Ruta para obtener lista de los empleados)
router.get('/lista-empleados', protegerSesion, listarEmpleados);

// Ruta para actualizar empleados
router.put('/cambiar-contrasena/:id', protegerSesion, actualizarEmpleado);

// Ruta para eliminar empleados
router.delete('/eliminar-empleado/:id', protegerSesion, actualizarEmpleado);
*/

module.exports = router;
