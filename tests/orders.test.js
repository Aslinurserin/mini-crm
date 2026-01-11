const request = require('supertest');
const app = require('../src/app');
const { sequelize } = require('../src/models');

describe('Orders & findOrCreate Logic', () => {
  test('POST /api/orders - Olmayan müşteri için otomatik kayıt ve Yüksek Tutar Statüsü', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ 
        email: 'yeni_musteri@mail.com', 
        totalAmount: 15000 // 10k üzeri olduğu için statü değişmeli
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.order.status).toBe('Stok Onayı Bekleniyor');
  });
});