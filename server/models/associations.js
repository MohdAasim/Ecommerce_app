const User = require('./User');
const UserAddress = require('./UserAddress');

// Associations
User.hasMany(UserAddress, { foreignKey: 'userId', as: 'addresses' });
UserAddress.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const syncDatabase = async () => {
  try {
    await require('../config/database.config').sync();
    console.log('Database synced successfully');
  } catch (err) {
    console.error('Error syncing database:', err);
  }
};

module.exports = {
  User,
  UserAddress,
  syncDatabase,
};
