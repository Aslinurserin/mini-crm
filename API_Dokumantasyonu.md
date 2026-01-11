# 📖 API Uç Noktaları (Endpoints) Dokümantasyonu

Tüm API yanıtları standart bir Trace ID içerir ve JSON formatındadır.

### Müşteri Yönetimi
* **GET `/api/customers`**: Tüm müşterileri listeler.
* **POST `/api/customers`**: Yeni müşteri oluşturur. (ETL temizlik kuralları burada uygulanır).

### Sipariş Yönetimi
* **POST `/api/orders`**: Yeni sipariş oluşturur.
  * Eğer müşteri sistemde yoksa otomatik olarak (findOrCreate) oluşturulur.
  * Sipariş tutarı 10.000 TL üzerindeyse otomatik "Yüksek Tutar" statüsü atanır.