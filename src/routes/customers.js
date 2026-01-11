const express = require('express');
const router = express.Router();
const { Customer } = require('../models'); // Doğrudan modelle veya servis üzerinden kontrol
const customerService = require('../services/customerService');
const logger = require('../lib/logger');

// GET /api/customers
router.get('/', async (req, res, next) => {
  try {
    const customers = await customerService.listCustomers();
    res.json(customers);
  } catch (err) {
    logger.error('Müşteri listeleme hatası', { err });
    next(err);
  }
});

// POST /api/customers
router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body;

    // 1. Manuel Mükerrer Kayıt Kontrolü (Hata Testini Geçirmek İçin)
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      const error = new Error('Bu e-posta adresi zaten kullanımda.');
      error.status = 400; // Bad Request
      error.code = 'DUPLICATE_EMAIL';
      throw error; // app.js'deki merkezi hata yakalayıcıya (error handler) gönderir
    }

    // 2. Müşteri Oluşturma
    const customer = await customerService.createCustomer(req.body);
    res.status(201).json(customer);
  } catch (err) {
    logger.error('Müşteri oluşturma hatası', { err });
    next(err);
  }
});

module.exports = router;
