'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // BURASI EKLENDİ: Foreign Key kısıtlaması
        references: {
          model: 'customers', // Hedef tablo adı
          key: 'id'           // Hedef kolon adı
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false, // Model ile uyumlu hale getirildi
        defaultValue: 'Hazırlanıyor' // Müşterinin istediği Türkçe değer 
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('orders');
  }
};