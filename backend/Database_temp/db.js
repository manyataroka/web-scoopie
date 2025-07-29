const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration - PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME || 'scoopie_db',
  process.env.DB_USER || 'manyataroka',
  process.env.DB_PASSWORD || 'password123',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false, // Set to console.log to see SQL queries
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = { sequelize };