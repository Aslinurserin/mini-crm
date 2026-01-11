const express = require('express');
const router = express.Router();
const { Order, Customer } = require('../models'); 
const logger = require('../lib/logger');

// POST /api/orders - Yeni Sipariş Oluşturma
router.post('/', async (req, res, next) => {
  try {
    const { email, firstName, lastName, totalAmount, status } = req.body;

    // 1. Müşteriyi e-posta adresinden kontrol et (Duplicate kontrolü) 
    let customer = await Customer.findOne({ where: { email } });

    // 2. Müşteri yoksa, "çelişkili talep" gereği anında oluştur 
    if (!customer) {
      logger.info(`Yeni müşteri sipariş anında oluşturuluyor: ${email}`);
      customer = await Customer.create({
        email,
        firstName: firstName || 'Yeni',
        lastName: lastName || 'Müşteri',
        isActive: true
      });
    }

    // 3. MANTIKLI STOK KONTROLÜ: 
    // Müşterinin belirsiz talebine istinaden: Çok yüksek tutarlı siparişlerde 
    // stok riskini yönetmek için bir uyarı mekanizması kuruyoruz.
    if (totalAmount > 10000) { 
      logger.warn(`Yüksek tutarlı sipariş için stok onayı bekleniyor. Müşteri: ${email}`);
      // Not: Gerçek bir sistemde burada sipariş 'onay bekliyor' durumuna çekilebilir.
    }

    // 4. Siparişi oluştur ve müşteriye bağla
    const order = await Order.create({
      customerId: customer.id,
      totalAmount: totalAmount || 0,
      status: status || 'Hazırlanıyor' // Müşterinin istediği Türkçe durum 
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