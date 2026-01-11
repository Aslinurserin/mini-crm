const request = require('supertest');
const app = require('../src/app');
const { sequelize, Customer } = require('../src/models');

describe('Customers & Error Handling API', () => {
  // Her test grubundan önce veritabanını sıfırla
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // Testler bittikten sonra veritabanı bağlantısını güvenli şekilde kapat
  afterAll(async () => {
    await sequelize.close();
  });

  test('GET /api/customers - Başlangıçta boş dizi dönmeli', async () => {
    const res = await request(app).get('/api/customers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('POST /api/customers - Yeni müşteri oluşturmalı', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send({ 
        firstName: 'Test', 
        lastName: 'User', 
        email: 'test@mail.com', // Email alanı sağlandı
        isActive: true 
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  /**
   * COPILOT & HOCA ÖNERİSİ: 
   * Aynı email ile kayıt denendiğinde sistemin çökmediğini ve 
   * standardize hata formatını (app.js'deki yapı) döndürdüğünü doğrular.
   */
  test('POST /api/customers - Aynı email ile hata dönmeli ve STANDART FORMATI korumalı', async () => {
    const res = await request(app)
      .post('/api/customers')
      .send({ 
        firstName: 'Mükerrer', 
        lastName: 'Kayıt', 
        email: 'test@mail.com' // Önceki testte kullanılan email
      });
    
    // Status 201 olmamalı (400 bekliyoruz)
    expect(res.statusCode).not.toBe(201);

    // app.js içerisinde tanımladığımız profesyonel hata yapısı kontrolü
    expect(res.body.success).toBe(false); 
    expect(res.body.error).toBeDefined();
    expect(typeof res.body.error.message).toBe('string');
    expect(res.body.error.timestamp).toBeDefined();
    expect(res.body.error.code).toBeDefined(); // DUPLICATE_EMAIL kontrolü
  });

  test('GET /api/customers - En az bir müşteri listelenmeli', async () => {
    const res = await request(app).get('/api/customers');
    // En azından ikinci testte başarıyla eklenen 'Test User' dönmeli
    expect(res.body.length).toBeGreaterThan(0); 
  });
});