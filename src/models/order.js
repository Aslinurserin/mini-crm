module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false
      // Foreign Key bağlantısı migration ve associate kısmında halledildi
    },
    // YENİ EKLENEN ALAN: Siparişi Ürüne bağlamak için
    productId: {
      type: DataTypes.INTEGER,
      allowNull: true // ETL'den gelen eski verilerde ürün olmayabileceği için true bıraktık
    },
    status: {
      type: DataTypes.ENUM(
        'Hazırlanıyor', 
        'Tamamlandı', 
        'İptal Edildi', 
        'Kargoya Verildi', 
        'Teslim Edildi', 
        'Stok Onayı Bekleniyor'
      ),
      allowNull: false,
      defaultValue: 'Hazırlanıyor'
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true 
    },
  }, {
    tableName: 'orders',
    underscored: true
  });

  Order.associate = (models) => {
    // Mevcut Müşteri Bağlantısı
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });

    // YENİ EKLENEN BAĞLANTI: Siparişi Ürüne Bağlıyoruz
    Order.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    });
  };

  return Order;
};