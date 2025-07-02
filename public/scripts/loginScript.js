// public/scripts/loginScript.js
import { mostrarMensaje } from './utilidadesScript.js';

document.addEventListener('DOMContentLoaded', () => {

  // Constantes para funcionamiento de botones

  const btnLogin = document.getElementById('btnLogin');
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');

  togglePassword?.addEventListener('change', () => {
    passwordInput.type = togglePassword.checked ? 'text' : 'password';
  });

  // Funcionalidades de cada botón

  // Btn Login para Iniciar Sesión
  btnLogin.addEventListener('click', async() => {

    const usuario = document.getElementById('usuario').value.trim();
    const password = passwordInput.value.trim();

    try {
      const res = await fetch('/ssist/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ usuario, password })
      });

      const msg = await res.text();

      mostrarMensaje(msg, res.ok ? 'success' : 'danger');

      if (res.ok) {
        setTimeout(() => (window.location.href = '/moduloPrincipal.html'), 1500);
      }
    } catch {
      mostrarMensaje('No se pudo conectar al servidor.', 'danger');
    }

  });

});
