const app = require('./app');
const { sequelize } = require('./models');
const logger = require('./lib/logger');

async function start() {
  try {
    // 1. Veritabanı bağlantısını kontrol et
    await sequelize.authenticate();
    logger.info('DB connection OK');

    // 2. Port numarasını buraya elle yazıyoruz (Hata buradaydı)
    const PORT = 3000;

    // 3. Sunucuyu başlat
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
      console.log(`🚀 Sunucu çalışıyor: http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error('BÜYÜK HATA:', err); // Hatayı net görmek için
    logger.error('Unable to start server', err);
    process.exit(1);
  }
}

start();