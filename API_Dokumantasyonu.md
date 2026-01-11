# API Uç Noktaları (Endpoints) Dokümantasyonu

Tüm API yanıtları, kurumsal izlenebilirlik standartlarına uygun olarak benzersiz bir Trace ID içerir ve JSON formatında sunulur.

### Müşteri Yönetimi
* **GET /api/customers**: Veritabanında kayıtlı olan tüm aktif müşterileri listeler.
* **POST /api/customers**: Yeni bir müşteri oluşturur. Bu uç nokta, ETL sürecindeki temizlik kurallarını (telefon numarası formatlama, isimlerdeki tırnak işaretlerini temizleme vb.) otomatik olarak uygular.

###  Ürün Yönetimi
* **GET /api/products**: Mevcut tüm ürünlerin listesini, birim fiyatlarını ve güncel stok durumlarını döner.
* **POST /api/products**: Sisteme yeni bir ürün tanımlar. Ürün bazında stok takibi yapılıp yapılmayacağı trackStock parametresi ile kontrol edilir.

###  Sipariş Yönetimi
* **POST /api/orders**: Yeni bir sipariş kaydı oluşturur.
  * **Parametreler**: Sipariş için email, firstName, lastName, totalAmount ve hangi ürünün sipariş edildiğini belirten productId bilgilerini alır.
  * **Otomatik Müşteri Kaydı**: Eğer sipariş veren e-posta adresi sistemde kayıtlı değilse, findOrCreate mekanizması ile müşteri kaydı sipariş anında otomatik olarak tamamlanır.
  * **Akıllı Stok Kontrolü**: Sipariş edilen ürünün stok takip özelliği aktifse, mevcut stok durumu kontrol edilerek sipariş süreci yönetilir.
  * **Risk ve Onay Politikası**: Toplam tutarı 10.000 TL üzerinde olan siparişler, sistem tarafından otomatik olarak "Stok Onayı Bekleniyor" statüsüne alınarak risk yönetimi sağlanır.

###  Hata ve Takip Mekanizması
* **Traceability (İzlenebilirlik)**: Tüm API süreçleri, merkezi günlükleme (logging) sistemine bağlıdır. Olası bir hata durumunda, kullanıcıya dönen traceId üzerinden hatanın kaynağı sunucu loglarından anlık olarak tespit edilebilir.
* **Hata Yanıtları**: Geçersiz e-posta formatı veya eksik zorunlu alan gönderimlerinde sistem 400 Bad Request hatası ile kullanıcıyı bilgilendirir.