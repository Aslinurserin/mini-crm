# Gereksinim Analiz Dokümanı

[cite_start]Bu doküman, müşterinin (hocanın) sunduğu belirsiz taleplerin netleştirilmesi ve proje kapsamında alınan teknik kararları içermektedir[cite: 20].

## 1. Müşteri Talepleri ve Soru Listesi
[cite_start]Müşteri tarafından iletilen belirsiz cümleler üzerine aşağıdaki sorular hazırlanmıştır[cite: 19]:

### 1.1 Müşteri Yönetimi
* [cite_start]**Soru:** Soyadı bulunmayan müşteriler için ne yapılmalı? [cite: 87]
* [cite_start]**Soru:** Aynı e-posta adresiyle kayıt olmak isteyen kişiler için duplicate engeli olmalı mı? [cite: 88]
* [cite_start]**Soru:** Adres bilgisi zorunlu mu tutulmalı? [cite: 89]

### 1.2 Ürün ve Sipariş Yönetimi
* [cite_start]**Soru:** Stok takibi yapılmayan ürünler siparişi nasıl etkilemeli? [cite: 92]
* [cite_start]**Soru:** Sistemde kaydı olmayan bir müşteri sipariş verebilir mi? [cite: 95]
* [cite_start]**Soru:** Sipariş durumları (status) neler olmalı? [cite: 98]

---

## 2. Netleştirilen Kararlar ve Uygulama Planı
PDF'teki senaryo ve müşteri görüşmeleri doğrultusunda şu kararlar alınmıştır:

### 2.1 Müşteri Yönetimi Kararları
* [cite_start]**Soyadı Yönetimi:** Soyadı bulunmayan müşteriler için veritabanında "Belirtilmemiş" varsayılan değeri atanacaktır[cite: 87].
* [cite_start]**Mükerrer Kayıt:** E-posta adresi benzersiz (unique) anahtar kabul edilerek mükerrer kayıtlar engellenmiştir[cite: 88].
* [cite_start]**Adres:** Adres bilgisi opsiyonel bırakılmış; ancak kargo süreçleri için TEXT alanında saklanmasına karar verilmiştir[cite: 89].

### 2.2 Sipariş ve Stok Yönetimi Kararları
* [cite_start]**Otomatik Kayıt:** "Müşteri sistemde yoksa da sipariş verebilmeli" talebi doğrultusunda `findOrCreate` mekanizması kurulmuştur[cite: 95].
* [cite_start]**Stok Kontrolü:** Stokta olmayan ürünler için siparişin engellenmemesine, ancak statünün "Hazırlanıyor" olarak set edilmesine karar verilmiştir[cite: 97, 98].
* **Yüksek Tutar Politikası:** 10.000 TL üzerindeki siparişler, risk yönetimi gereği otomatik olarak "Stok Onayı Bekleniyor" statüsüne alınacaktır.

### 2.3 ETL ve Veri Geçişi Kararları
* [cite_start]**Telefon Temizliği:** +90, 0 ve parantez içeren tüm numaralar standart formatta temizlenecektir[cite: 102].
* [cite_start]**Hatalı Veriler:** E-posta formatı geçersiz olan kayıtlar sisteme alınmayacak ve ETL raporunda listelenecektir[cite: 101, 127].

---

## 3. Kabul Kriterleri (Final Beklentileri)
* [cite_start]Tüm API uçlarının çalışır durumda olması[cite: 76].
* [cite_start]Birim ve entegrasyon testlerinin başarıyla geçmesi[cite: 41, 42].
* [cite_start]CI Pipeline (GitHub Actions) sürecinin tamamlanması[cite: 44].