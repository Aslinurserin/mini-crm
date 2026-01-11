# [cite_start]Veritabanı Migration Raporu 

[cite_start]**Görev:** Eski yazılımcıdan kalan bozuk migration dosyalarının onarılması[cite: 55, 123].

* [cite_start]**İlişkiler**: `customers` ve `orders` tabloları arasında Foreign Key bağı kuruldu[cite: 23].
* [cite_start]**İsimlendirme**: Tablo isimleri İngilizce (customers, orders) olarak standartlaştırıldı[cite: 114].
* [cite_start]**Sürüm Kontrolü**: `npx sequelize-cli db:migrate` komutuyla şema tutarlılığı sağlandı[cite: 56].