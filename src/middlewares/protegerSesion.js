// src/middlewares/protegerSesion.js

/**
 * Middleware para proteger rutas privadas.
 * Si no hay sesión activa, bloquea el acceso.
 */
module.exports = (req, res, next) => {
  if (req.session?.usuario) return next(); // ✅ sesión válida

  const aceptaJSON = req.headers.accept?.includes('application/json');

  if (aceptaJSON || req.xhr) {
    return res.status(401).json({ mensaje: 'Sesión expirada' });
  }

  // Redirección tradicional para navegación normal
  return res.redirect('/');
};
