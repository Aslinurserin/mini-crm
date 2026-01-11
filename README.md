# 🚀 MiniCRM (Tamamlanmış Kurumsal Proje)

Bu proje, orijinalinde yarım kalmış bir MiniCRM sisteminin, kurumsal standartlara ve modern yazılım pratiklerine uygun olarak **tamamen modernize edilmiş ve tamamlanmış** halidir.

## Güncel Durum: %100 Tamamlandı
Proje, başlangıçtaki tüm eksiklikleri giderecek şekilde optimize edilmiştir:
* **Mimari:** İlişkisel veritabanı şeması (Foreign Key) ve migration yapısı onarıldı.
* **Traceability:** Her API isteğine benzersiz bir `Trace ID` (UUID) atanarak kurumsal loglama mekanizması entegre edildi.
* **Veri Kalitesi:** ETL scripti ile mükerrer kayıt kontrolü, telefon numarası standardizasyonu ve email format doğrulaması (Sequelize Validation) eklendi.
* **Güvenlik:** Ortam değişkenleri (`.env`) ayrıştırıldı ve `PROD/TEST/DEV` ortam yapılandırmaları hazırlandı.

## Geliştirme ve CI/CD Süreci
Geliştirme süreci modern bir **Branch Workflow** yapısı kullanılarak yönetilmiştir ve CI/CD süreçleri **GitHub Actions** üzerinden takip edilmiştir. Her commit, otomatik testlerden geçerek kod kalitesi garanti altına alınmıştır.

## Test Kapsamı
* **Toplam Kapsam:** %74.75
* **Durum:** GitHub Actions üzerinde tüm testler başarıyla geçmiştir (Passed).

##Kurulum ve Çalıştırma
Detaylı talimatlar için lütfen [Kurulum_Rehberi.md](./Kurulum_Rehberi.md) dosyasını inceleyin. Temel komutlar:
```bash
npm install          # Bağımlılıkları yükler
npm start            # Sunucuyu başlatır
npm test             # Testleri ve coverage raporunu çalıştırır
node etl-script.js   # Veri temizleme ve aktarım sürecini başlatır
