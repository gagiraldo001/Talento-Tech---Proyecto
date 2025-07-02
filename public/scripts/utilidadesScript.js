// utilidades.js
// Funcion para filtrar tablas

export function filtrarTabla(parametro, tabla) {
  if (!parametro || !tabla) return;

  parametro.addEventListener("keyup", () => {
    const valorFiltro = parametro.value.toLowerCase();
    const filas = tabla.querySelectorAll("tbody tr");

    filas.forEach(fila => {
      const texto = fila.textContent.toLowerCase();
      fila.style.display = texto.includes(valorFiltro) ? "" : "none";
    });
  });
}

export function mostrarMensaje(texto, tipo = 'info') {
  const contenedor = document.getElementById('mensaje');
  const parrafo = document.getElementById('mensajeRespuesta');

  if (!contenedor || !parrafo) {
    console.warn('No se encontró el contenedor de mensaje en el DOM');
    return;
  }

  // Limpiar clases anteriores y configurar nuevas
  contenedor.className = `mensaje alert alert-${tipo} alert-dismissible fade show`;
  parrafo.textContent = texto;
  contenedor.style.display = 'block';
  contenedor.classList.add('mostrar');

  // Ocultar automáticamente después de 3.5 segundos
  setTimeout(() => {
    contenedor.classList.remove('show');
    contenedor.classList.add('hide');
    contenedor.style.display = 'none';
  }, 3500);
}

export function borrarMensaje(texto) {
  mensaje.textContent = texto;
}

export function irMenu() {
  window.location.href = '/moduloPrincipal.html';
}

export function irUsuarios() {
  window.location.href = '/moduloUsuarios.html';
}

export function irEmpleados() {
  window.location.href = '/moduloEmpleados.html';
}

export function irContrasenas() {
  window.location.href = '/moduloContrasenas.html';
}