const { sequelize } = require('./src/models');
const customerService = require('./src/services/customerService');

async function ekle() {
  try {
    // Veritabanına bağlan
    await sequelize.authenticate();
    console.log('🔌 Veritabanına bağlandı...');

    // Müşteriyi oluştur (Senaryodaki ilk müşteri)
    const yeniMusteri = await customerService.createCustomer({
      firstName: 'Ahmet',
      lastName: 'Yılmaz',
      email: 'ahmet.yilmaz@mail.com',
      phone: '+90 532 111 22 33',
      address: 'İstanbul, Kadıköy',
      isActive: true
    });

    console.log('✅ BAŞARILI! Müşteri Eklendi:', yeniMusteri.firstName, yeniMusteri.lastName);
    process.exit(0);
  } catch (error) {
    console.error('❌ HATA:', error);
    process.exit(1);
  }
}

ekle();