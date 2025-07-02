// public/scripts/empleadosScript.js
import { filtrarTabla, mostrarMensaje, irMenu, irUsuarios } from './utilidadesScript.js';

document.addEventListener('DOMContentLoaded', () => {

    // Constantes para llenar la tabla y hacer filtro
    const filtroId = document.getElementById('filtro');
    const tablaEmpleados = document.getElementById('tabla-empleados');

    // Constantes para funcionamiento de funciones
    const formulario = document.getElementById('productosForm');
    const btnNuevo = document.getElementById('btnNuevo');
    const btnGuardar = document.getElementById('btnGuardar');
    const btnActualizar = document.getElementById('btnActualizar');
    const btnEliminar = document.getElementById('btnEliminar');
    const btnIrUsuarios = document.getElementById('btnIrUsuarios');
    const btnIrMenu = document.getElementById('btnIrMenu');
    const btnInicioLogo = document.getElementById('btnInicioLogo');

    // Inicio con un formulario limpio y los botones eliminar y actualizar inhabilitados
    limpiarFormulario();
    // Se llaman las funciones para llenar la tabla y habilitar filtros
    filtrarTabla(filtroId, tablaEmpleados);
    llenarTabla();

    // Funcionalidades de cada botón

    // Salir al menú
    btnIrMenu.addEventListener('click', irMenu);
    btnInicioLogo.addEventListener('click', irMenu);
    btnIrUsuarios.addEventListener('click', irUsuarios);

    // Btn Nuevo para limpiar formulario
    btnNuevo.addEventListener('click', () => {
        limpiarFormulario();
    });

    // Btn Guardar para crea nuevo empleado
    btnGuardar.addEventListener('click', async (e) => {
        e.preventDefault();
        // Cargo los datos del formulario
        const datos = obtenerDatosFormulario();
        guardarEmpleado(datos);
    });

    // Actualizar para modifica datos de un empleado
    btnActualizar.addEventListener('click', async (e) => {
        e.preventDefault();
        // Cargo los datos del formulario
        const datos = obtenerDatosFormulario();
        const empDniOriginal = document.getElementById('empDniOriginal').value;
        actualizarEmpleado(datos, empDniOriginal);
    });

    // Eliminar para borrar un empleado según empDni
    btnEliminar.addEventListener('click', async () => {
        const empDni = document.getElementById('empDni').value;
        eliminarEmpleado(empDni);
    });







    // Funciones

    async function actualizarEmpleado(datos, empDniOriginal) {

        try {
            const res = await fetch(`/ssist/empleados/actualizar-empleado/${empDniOriginal}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(datos)
            });

            if (!res.ok) throw new Error('Error al actualizar');
            mostrarMensaje('Empleado actualizado con éxito', 'success');
            limpiarFormulario();
            llenarTabla();
        } catch (err) {
            mostrarMensaje('No se pudo actualizar el empleado', 'danger');
        }
    }

    function limpiarFormulario() {
        formulario.reset();
        document.getElementById('empDniOriginal').value = '';
        btnActualizar.disabled = true;
        btnEliminar.disabled = true;
        btnGuardar.disabled = false;
    }

    async function guardarEmpleado(datos) {
        try {

            // Verificar que todos los campos tengan contenido
            const camposIncompletos = Object.values(datos).some(valor => valor === '');

            if (camposIncompletos) {
                mostrarMensaje('Por favor, completa todos los campos antes de continuar.', 'warning');
                return;
            }
            const res = await fetch('/ssist/empleados/crear-empleado', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(datos)
            });

            if (res.status === 409) {
                const data = await res.json();
                mostrarMensaje(data.error, 'warning');
                return;
            }

            if (!res.ok) throw new Error('Error al guardar');
            mostrarMensaje('Empleado registrado correctamente', 'success');
            limpiarFormulario();
            llenarTabla();
        } catch (err) {
            mostrarMensaje('No se pudo guardar el empleado', 'danger');
        }
    }

    async function eliminarEmpleado(empDni) {
        {
            if (!empDni) {
                return mostrarMensaje('Ingrese la cédula a eliminar', 'warning');
            }

            if (!confirm('¿Seguro que deseas eliminar este empleado?')) return;

            try {
                const res = await fetch(`/ssist/empleados/eliminar-empleado/${empDni}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });

                if (!res.ok) throw new Error('Error al eliminar');
                mostrarMensaje('Empleado eliminado correctamente', 'success');
                formulario.reset();
                llenarTabla();
            } catch (err) {
                mostrarMensaje('No se pudo eliminar el empleado', 'danger');
            }
        }

        // Ir a usuarios
        btnIrUsuarios.addEventListener('click', () => {
            window.location.href = '/moduloUsuarios.html';
        });
    }

    function obtenerDatosFormulario() {
        return {
            empDni: document.getElementById('empDni').value.trim(),
            empNombre: document.getElementById('empNombre').value.trim(),
            empApellido: document.getElementById('empApellido').value.trim(),
            empTelefono: document.getElementById('empTelefono').value.trim(),
            empDireccion: document.getElementById('empDireccion').value.trim(),
            empBarrio: document.getElementById('empBarrio').value.trim(),
            empCiudad: document.getElementById('empCiudad').value.trim(),
            empEmail: document.getElementById('empEmail').value.trim()
        };
    }

    // Función para cargar datos en la tabla y darle un evento al click de cada fila para cargar lo datos en el formulario
    async function llenarTabla() {
        try {
            const res = await fetch('/ssist/empleados/lista-empleados', {
                credentials: 'include'
            });

            if (!res.ok) throw new Error();

            const lista_empleados = await res.json();
            const tablaEmpleados = document.querySelector('#tabla-empleados tbody');

            // Limpiar la tabla antes de cargar datos nuevos
            tablaEmpleados.innerHTML = '';

            lista_empleados.forEach(emp => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
        <td>${emp.empDni}</td>
        <td>${emp.empNombre}</td>
        <td>${emp.empApellido}</td>
        <td>${emp.empTelefono}</td>
        <td>${emp.empDireccion}</td>
        <td>${emp.empBarrio}</td>
        <td>${emp.empCiudad}</td>
        <td>${emp.empEmail}</td>
      `;

                // Evento para cargar datos al hacer clic en la fila
                fila.addEventListener('click', () => {
                    document.getElementById('empDni').value = emp.empDni;
                    document.getElementById('empDniOriginal').value = emp.empDni;
                    document.getElementById('empNombre').value = emp.empNombre;
                    document.getElementById('empApellido').value = emp.empApellido;
                    document.getElementById('empTelefono').value = emp.empTelefono;
                    document.getElementById('empDireccion').value = emp.empDireccion;
                    document.getElementById('empBarrio').value = emp.empBarrio;
                    document.getElementById('empCiudad').value = emp.empCiudad;
                    document.getElementById('empEmail').value = emp.empEmail;

                    // Si se cargan datos de un empleado solo se habilita actualizar
                    btnActualizar.disabled = false;
                    btnEliminar.disabled = false;
                    btnGuardar.disabled = true;

                });

                tablaEmpleados.appendChild(fila);
            });
        } catch (err) {
            mostrarMensaje('Error al cargar datos del usuario.', 'warning');
            console.error(err);
        }
    }

});
