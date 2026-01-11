require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'mini_crm_dev',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432
  },
  test: {
    // GitHub Actions (CI) ortamı için kritik ayarlar
    username: 'postgres',
    password: 'password', // ci.yaml içindeki POSTGRES_PASSWORD ile aynı olmalı
    database: 'mini_crm_test',
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432,
    logging: false // Test sırasında konsolun çok kalabalık olmaması için
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false
  }
};