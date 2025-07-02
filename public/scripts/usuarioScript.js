// public/scripts/usuarioScript.js

// public/scripts/loginScript.js
import { mostrarMensaje, irMenu } from './utilidadesScript.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('contrasenaForm');

  const btnActualizar = document.getElementById('btnActualizar');
  const btnLimpiar = document.getElementById('btnLimpiar');
  const btnIrMenu = document.getElementById('btnIrMenu');
  const btnInicioLogo = document.getElementById('btnInicioLogo');

  const nombreUsuario = document.getElementById('nombreUsuario');
  const passwordOld = document.getElementById('passwordOld');
  const passwordNew = document.getElementById('passwordNew');
  const passwordNew2 = document.getElementById('passwordNew2');

  cargarDatosUsuario();

  // Funcion de cada boton

  // Btn Limpiar para limpiar formulario
  btnLimpiar.addEventListener('click', () => {
    limpiarFormulario();
  });

  // Btn Actualizar para cambiar la contraseña
  btnActualizar.addEventListener('click', async (e) => {
    e.preventDefault();
    actualizarContraseña();
  });

  // Btn Salir para regresar el menu principal
  btnIrMenu.addEventListener('click', irMenu);
  btnInicioLogo.addEventListener('click', irMenu);

  // Creo funciones para cada accion de los botones

  async function actualizarContraseña() {

    if (!passwordNew.value || !passwordNew2.value || !passwordOld.value) {
      return mostrarMensaje('No pueden haber campos vacios', 'warning');
    }

    if (passwordNew.value !== passwordNew2.value) {
      return mostrarMensaje('Las contraseñas nuevas no coinciden.', 'warning');
    }

    if (passwordOld.value === passwordNew.value) {
      return mostrarMensaje('La contraseña nueva no puede la misma anterior', 'warning');
    }

    try {
      const res = await fetch('/ssist/usuario/cambiar-contrasena', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          actual: passwordOld.value,
          nueva: passwordNew.value
        })
      });

      const msg = await res.text();
      mostrarMensaje(msg, res.ok ? 'success' : 'danger');

      if (res.ok) {
        limpiarFormulario();
      }

    } catch {
      mostrarMensaje('No se pudo conectar al servidor.', 'warning');
    }
  }

  function limpiarFormulario() {
    form.reset();
    setTimeout(() => {
      // Vuelvo a cargar el nombre del usuario activo
      cargarDatosUsuario();
    }, 0);
  }

  // Mostrar datos del usuario actual
  async function cargarDatosUsuario() {
    try {
      const res = await fetch('/ssist/usuario/usuario-activo', {
        credentials: 'include'
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      nombreUsuario.value = data.usuNombre;
    } catch {
      mostrarMensaje('Error al cargar datos del usuario.', 'red');
    }
  }

  // Toggle de contraseñas
  const togglePassword = (iconSelector, input) => {
    const icon = document.querySelector(iconSelector);
    if (!icon || !input) return;

    icon.addEventListener('click', () => {
      const visible = input.type === 'text';
      input.type = visible ? 'password' : 'text';
      icon.classList.toggle('fa-eye-slash', !visible);
    });
  };

  togglePassword('.show-password', passwordOld);
  togglePassword('.show-password2', passwordNew);
  togglePassword('.show-password3', passwordNew2);

});
