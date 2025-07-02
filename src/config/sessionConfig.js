// src/config/sessionConfig.js
const session = require('express-session');
require('dotenv').config();

/**
 * Configuración base para manejo de sesiones.
 */
const sessionConfig = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000, // 30 minutos
    sameSite: 'lax',
    secure: false
  }
});

module.exports = sessionConfig;
