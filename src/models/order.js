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
    status: {
      // HATA BURADAYDI: Testin beklediği 'Stok Onayı Bekleniyor' değerini ekledik
      type: DataTypes.ENUM(
        'Hazırlanıyor', 
        'Tamamlandı', 
        'İptal Edildi', 
        'Kargoya Verildi', 
        'Teslim Edildi', 
        'Stok Onayı Bekleniyor'
      ),
      allowNull: false,
      defaultValue: 'Hazırlanıyor' // Varsayılan durum
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true 
    },
  }, {
    tableName: 'orders',
    underscored: true
  });

  // BURASI ÇOK ÖNEMLİ: Siparişi Müşteriye Bağlıyoruz
  Order.associate = (models) => {
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      as: 'customer'
    });
  };

  return Order;
};
