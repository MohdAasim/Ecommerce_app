const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
  },
  otpExpiresAt: {
    type: DataTypes.DATE,
  },
});

module.exports = User;
