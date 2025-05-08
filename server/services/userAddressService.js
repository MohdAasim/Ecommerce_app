const { User, UserAddress } = require('../models/associations');

exports.createAddress = async (userId, addressData) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  return await UserAddress.create({ userId, ...addressData });
};

exports.getAddressesByUser = async (userId) => {
  return await UserAddress.findAll({ where: { userId } });
};

exports.updateAddress = async (addressId, userId, newData) => {
  const address = await UserAddress.findOne({ where: { id: addressId, userId } });
  if (!address) throw new Error('Address not found');

  await address.update(newData);
  return address;
};

exports.deleteAddress = async (addressId, userId) => {
  const address = await UserAddress.findOne({ where: { id: addressId, userId } });
  if (!address) throw new Error('Address not found');

  await address.destroy();
  return { message: 'Address deleted successfully' };
};

