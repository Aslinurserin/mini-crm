# 🚀 Kurulum ve Çalıştırma Rehberi

### Adımlar
1. **Bağımlılıkları Yükleme**: `npm install`
2. **Veritabanı Yapılandırması**: `.env` dosyasını düzenleyin.
3. **Migration Çalıştırma**: `npx sequelize-cli db:migrate`
4. **ETL Scriptini Çalıştırma**: `node etl-script.js`
5. **Projeyi Başlatma**: `npm start`

### Testler
Testleri kapsam raporuyla birlikte çalıştırmak için:
`npm test -- --coverage`