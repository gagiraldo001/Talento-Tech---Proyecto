// src/controllers/principalController.js

/**
 * Cierra la sesión del usuario actual.
 */
function ejecutarLogout(req, res) {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al destruir sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }

    res.clearCookie('connect.sid');
    res.status(200).send('Sesión cerrada');
  });
}

module.exports = { ejecutarLogout };
