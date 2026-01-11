const request = require('supertest');
const app = require('../src/app');
const { sequelize, Customer } = require('../src/models');

describe('Customers API', () => {
  // Her testten önce veritabanını temizle ve şemayı oluştur [cite: 57]
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // Testler bittikten sonra bağlantıyı kapat [cite: 28]
  afterAll(async () => {
    await sequelize.close();
  });

  test('GET /api/customers başlangıçta boş dizi dönmeli', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('POST /api/customers yeni müşteri oluşturmalı', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send({ 
        firstName: 'Test', 
        lastName: 'User', 
        email: 'test@mail.com', // Eksik olan email eklendi [cite: 89]
        isActive: true 
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  test('GET /api/customers en az bir müşteri dönmeli', async () => {
    const res = await request(app).get('/api/customers');
    // Önceki hatayı düzelttik: 1'den büyük değil, 0'dan büyük olmalı 
    expect(res.body.length).toBeGreaterThan(0); 
  });
});