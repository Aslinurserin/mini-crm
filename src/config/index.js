require('dotenv').config(); // .env dosyasını okumasını sağlar

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'mini_crm_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres', // İşte eksik olan kritik ayar bu!
    port: process.env.DB_PORT || 5432
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: 'mini_crm_test',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432
  }
};