// public/scripts/principalScript.js
document.addEventListener('DOMContentLoaded', () => {
  cargarDatosUsuario();
  iniciarReloj();

  // Evento de cierre de sesión
  document.getElementById('cerrarSesion')?.addEventListener('click', (e) => {
    e.preventDefault();
    ejecutarLogout();
  });
});

/**
 * Carga datos del usuario autenticado y actualiza el DOM.
 */
async function cargarDatosUsuario() {
  try {
    const res = await fetch('/ssist/usuario/usuario-activo', {
      credentials: 'include'
    });

    if (!res.ok) throw new Error('No autorizado');

    const data = await res.json();
    document.getElementById('nombreEmpleado').textContent = data.empNombre;
    document.getElementById('rolEmpleado').textContent = data.usuPerfil;
  } catch (err) {
    console.error('❌ No se pudo cargar el usuario:', err);
    window.location.href = '/';
  }
}

/**
 * Verifica si la sesión está activa.
 * Puedes usarla si necesitas proteger carga de otros scripts.
 */
async function verificarSesion() {
  try {
    const res = await fetch('/session', { credentials: 'include' });
    if (!res.ok) throw new Error('Sesión no activa');
  } catch (err) {
    window.location.href = '/';
  }
}

/**
 * Cierra la sesión en backend y redirige al login.
 */
async function ejecutarLogout() {
  try {
    const res = await fetch('/ssist/sistema/logout', {
      method: 'POST',
      credentials: 'include'
    });

    if (res.ok) {
      window.location.href = '/';
    } else {
      throw new Error('No se pudo cerrar sesión');
    }
  } catch (err) {
    alert('Error al cerrar sesión.');
  }
}

/**
 * Muestra la fecha y hora actual en tiempo real.
 */
function iniciarReloj() {
  const actualizar = () => {
    const ahora = new Date();
    document.getElementById('fechaHora').textContent = ahora.toLocaleString();
  };
  actualizar();
  setInterval(actualizar, 1000);
}

