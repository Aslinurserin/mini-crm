# ETL (Veri Temizleme ve Aktarım) Sonuç Raporu

**Görev:** Müşterinin (Hoca) sunduğu bozuk Excel verilerinin temizlenerek sisteme aktarılması.

* **Telefon Temizliği**: +90, 0 ve parantez içeren tüm numaralar (Örn: `0(532)...`) Regex kullanılarak standart `+905XXXXXXXXX` formatına dönüştürüldü.
* **Mükerrer Kayıtlar**: Aynı e-posta adresine sahip (Örn: `Fatma Nur Yilmaz`) kayıtlar `email` üzerinden kontrol edilerek tekilleştirildi.
* **Veri Bütünlüğü**: Soyadı boş olan kayıtlara "Belirtilmemiş" değeri atanarak veritabanı kısıtlamaları (NOT NULL) sağlandı.
* **Hata Yönetimi**: Geçersiz email formatına sahip (`ceren@@mail.com`) kayıtlar ayıklanarak raporlandı.