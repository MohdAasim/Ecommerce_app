const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image_url: DataTypes.STRING,
  category: DataTypes.STRING,
},{timestamps: true, // default, includes createdAt and updatedAt
});

module.exports = Product;
