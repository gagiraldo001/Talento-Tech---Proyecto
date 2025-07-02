// src/config/dbConfig.js
const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Pool de conexiones MySQL basado en variables de entorno.
 */
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
