const db = require('../models'); // Modelleri buradan çekiyoruz

module.exports = {
  // Tüm müşterileri listele
  async listCustomers() {
    // db.Customer modelini kullanarak veritabanına soruyoruz
    return await db.Customer.findAll();
  },

  // Yeni müşteri oluştur
  async createCustomer(data) {
    return await db.Customer.create(data);
  }
};
