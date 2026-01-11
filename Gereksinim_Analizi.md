# Gereksinim Analiz Dokümanı

Bu doküman, müşterinin (hocanın) sunduğu belirsiz taleplerin netleştirilmesi ve proje kapsamında alınan teknik kararları içermektedir.

## 1. Müşteri Talepleri ve Soru Listesi
Müşteri tarafından iletilen belirsiz cümleler üzerine aşağıdaki sorular hazırlanmıştır:

### 1.1 Müşteri Yönetimi
* **Soru:** Soyadı bulunmayan müşteriler için ne yapılmalı?
* **Soru:** Aynı e-posta adresiyle kayıt olmak isteyen kişiler için duplicate engeli olmalı mı?
* **Soru:** Adres bilgisi zorunlu mu tutulmalı?

### 1.2 Ürün ve Sipariş Yönetimi
* **Soru:** Stok takibi yapılmayan ürünler siparişi nasıl etkilemeli?
* **Soru:** Sistemde kaydı olmayan bir müşteri sipariş verebilir mi?
* **Soru:** Sipariş durumları (status) neler olmalı?

---

## 2. Netleştirilen Kararlar ve Uygulama Planı
PDF'teki senaryo ve müşteri görüşmeleri doğrultusunda şu kararlar alınmıştır:

### 2.1 Müşteri Yönetimi Kararları
* **Soyadı Yönetimi:** Soyadı bulunmayan müşteriler için veritabanında "Belirtilmemiş" varsayılan değeri atanacaktır.
* **Mükerrer Kayıt:** E-posta adresi benzersiz (unique) anahtar kabul edilerek mükerrer kayıtlar engellenmiştir.
* **Adres:** Adres bilgisi opsiyonel bırakılmış; ancak kargo süreçleri için TEXT alanında saklanmasına karar verilmiştir.

### 2.2 Ürün ve Stok Yönetimi Kararları
* **Merkezi Ürün Yönetimi:** Ürünlerin fiyat, stok ve stok takip durumu için merkezi bir `Product` modeli oluşturulmuştur.
* **Stok Takibi:** Müşteri talebi doğrultusunda ürün bazlı stok takibi özelliği eklenmiş, stok takibi istenmeyen ürünler için `trackStock` kontrolü geliştirilmiştir.
* **Stok Kontrolü:** Stokta olmayan ürünler için siparişin engellenmemesine, ancak statünün "Hazırlanıyor" olarak set edilmesine karar verilmiştir.

### 2.3 Sipariş Yönetimi Kararları
* **Otomatik Kayıt:** "Müşteri sistemde yoksa da sipariş verebilmeli" talebi doğrultusunda `findOrCreate` mekanizması kurulmuştur.
* **Yüksek Tutar Politikası:** 10.000 TL üzerindeki siparişler, risk yönetimi gereği otomatik olarak "Stok Onayı Bekleniyor" statüsüne alınacaktır.
* **İlişkisel Bağlantı:** Siparişler, hem `Customer` hem de `Product` modelleriyle Foreign Key üzerinden ilişkilendirilmiştir.

### 2.4 ETL ve Veri Geçişi Kararları
* **Telefon Temizliği:** +90, 0 ve parantez içeren tüm numaralar standart formatta temizlenecektir.
* **Hatalı Veriler:** E-posta formatı geçersiz olan kayıtlar sisteme alınmayacak ve ETL raporunda listelenecektir.

---

## 3. Kabul Kriterleri (Final Beklentileri)
* Tüm API uçlarının (Müşteri, Sipariş, Ürün) çalışır durumda olması.
* Birim ve entegrasyon testlerinin başarıyla geçmesi.
* CI Pipeline (GitHub Actions) sürecinin tamamlanması.