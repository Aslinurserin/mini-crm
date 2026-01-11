const express = require('express');
const logger = require('./lib/logger');

const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');

const app = express();

// TODO: Gelecek fazda rate limiting ve cors eklenebilir.
app.use(express.json());

// Gelişmiş Request Loglama
app.use((req, res, next) => {
  logger.info(`İstek Alındı: ${req.method} ${req.url}`);
  next();
});

app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);

/**
 * PROFESYONEL HATA YÖNETİMİ (Standardized Error Handling)
 * Copilot önerisi ve müşteri gereksinimleri doğrultusunda yapılandırıldı.
 */
app.use((err, req, res, next) => {
  // Hatayı detaylıca log dosyasına yaz (Winston ile)
  logger.error('Sistem Hatası Yakalandı:', { 
    message: err.message, 
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  // Kullanıcıya (veya hocaya) dönecek standart hata formatı
  const statusCode = err.status || 500;
  
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Sunucu taraflı bir hata oluştu',
      code: err.code || 'INTERNAL_SERVER_ERROR',
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = app;
