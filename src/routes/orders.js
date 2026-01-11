const express = require('express');
const router = express.Router();
const { Order, Customer } = require('../models'); 
const logger = require('../lib/logger');

// POST /api/orders - Yeni Sipariş Oluşturma
router.post('/', async (req, res, next) => {
  try {
    const { email, firstName, lastName, totalAmount } = req.body;

    // 1. Race Condition Önleyici: findOrCreate kullanımı 
    // Bu yöntem, aynı anda gelen iki istekte müşterinin tek bir kez oluşmasını garanti eder.
    const [customer] = await Customer.findOrCreate({
      where: { email },
      defaults: {
        firstName: firstName || 'Yeni',
        lastName: lastName || 'Müşteri',
        isActive: true
      }
    });

    // 2. Mantıklı Stok ve Durum Yönetimi [cite: 98, 99]
    let orderStatus = 'Hazırlanıyor';
    
    // Eğer tutar çok yüksekse, stok onayı için 'Beklemede' durumuna alıyoruz.
    if (totalAmount > 10000) { 
      logger.warn(`Yüksek tutarlı sipariş - Stok onayı bekleniyor: ${email}`);
      orderStatus = 'Stok Onayı Bekleniyor'; 
    }

    // 3. Siparişi Oluştur
    const order = await Order.create({
      customerId: customer.id,
      totalAmount: totalAmount || 0,
      status: orderStatus
    });

    res.status(201).json({
      message: 'Sipariş başarıyla oluşturuldu',
      order
    });
  } catch (err) {
    logger.error('Sipariş oluşturma hatası', { err });
    next(err);
  }
});

module.exports = router;