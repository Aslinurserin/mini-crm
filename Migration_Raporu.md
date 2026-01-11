# Veritabanı Migration Raporu

**Görev:** Eski yazılımcıdan kalan bozuk migration dosyalarının onarılması ve ilişkisel yapının kurulması.

* **İlişkisel Mimari:** `orders` ve `customers` tabloları arasında `customer_id` üzerinden Foreign Key (Dış Anahtar) bağı kuruldu.
* **Şema Onarımı:** `20240101...` tarihli hatalı migration dosyaları, sistemin sorunsuz ayağa kalkması için revize edildi.
* **Veri Tipleri:** Telefon ve Email alanları için karakter limitleri (VARCHAR) ve benzersizlik (UNIQUE) kısıtları eklendi.