const express = require('express');
const { randomUUID } = require('crypto'); // [GÜNCELLENDİ] uuid yerine Node.js yerleşik crypto modülünü kullanıyoruz
const logger = require('./lib/logger');

const customersRouter = require('./routes/customers');
const ordersRouter = require('./routes/orders');

const app = express();

app.use(express.json());

/**
 * [GÜNCELLENDİ] TRACE ID MIDDLEWARE
 * Node.js crypto.randomUUID() kullanarak Jest ile tam uyumlu hale getirildi.
 */
app.use((req, res, next) => {
    req.traceId = randomUUID(); 
    next();
});

// Gelişmiş Request Loglama (Trace ID eklendi)
app.use((req, res, next) => {
    logger.info(`İstek Alındı: ${req.method} ${req.url}`, { traceId: req.traceId });
    next();
});

app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);

/**
 * PROFESYONEL HATA YÖNETİMİ
 * Trace ID buraya eklendi, böylece hata raporlarında takip edilebilir olacak.
 */
app.use((err, req, res, next) => {
  logger.error('Sistem Hatası Yakalandı:', { 
    message: err.message, 
    stack: err.stack,
    path: req.path,
    method: req.method,
    traceId: req.traceId 
  });

  const statusCode = err.status || 500;
  
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message || 'Sunucu taraflı bir hata oluştu',
      code: err.code || 'INTERNAL_SERVER_ERROR',
      traceId: req.traceId, 
      timestamp: new Date().toISOString()
    }
  });
});

module.exports = app;