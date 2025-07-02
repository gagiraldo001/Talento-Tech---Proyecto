// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const sessionConfig = require('./src/config/sessionConfig'); // ✅ Configuración unificada

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// Middlewares globales
// --------------------
app.use(cors({
  origin: `http://localhost:${PORT}`,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig); // ✅ Única configuración de sesiones

// --------------------
// Archivos estáticos
// --------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// --------------------
// Rutas principales
// --------------------
app.use('/ssist/auth', require('./src/routes/loginRoutes'));
app.use('/ssist/usuario', require('./src/routes/usuarioRoutes'));
app.use('/ssist/sistema', require('./src/routes/principalRoutes'));
app.use('/ssist/empleados', require('./src/routes/empleadosRoutes.js'));


// --------------------
// Página de inicio
// --------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'moduloLogin.html'));
});

// --------------------
// Verificación de sesión
// --------------------
app.get('/session', (req, res) => {
  if (req.session?.usuario) {
    res.status(200).json({ sesion: true });
  } else {
    res.status(401).json({ sesion: false });
  }
});

// --------------------
// Arranque del servidor
// --------------------
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
