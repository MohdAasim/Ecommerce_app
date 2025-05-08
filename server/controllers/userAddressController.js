const userAddressService = require('../services/userAddressService');

exports.createAddress = async (req, res) => {
  const { userId, street, city, state, postalCode, country } = req.body;
  try {
    const address = await userAddressService.createAddress(userId, {
      street, city, state, postalCode, country
    });
    res.status(201).json(address);
  } catch (err) {
    res.status(err.message === 'User not found' ? 404 : 500).json({ error: err.message });
  }
};

exports.getUserAddresses = async (req, res) => {
  const { userId } = req.params;
  try {
    const addresses = await userAddressService.getAddressesByUser(userId);
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateAddress = async (req, res) => {
  const { addressId } = req.params;
  const { userId, street, city, state, postalCode, country } = req.body;
  try {
    const updated = await userAddressService.updateAddress(addressId, userId, {
      street, city, state, postalCode, country
    });
    res.json(updated);
  } catch (err) {
    res.status(err.message === 'Address not found' ? 404 : 500).json({ error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  const { addressId } = req.params;
  const { userId } = req.body;
  try {
    const result = await userAddressService.deleteAddress(addressId, userId);
    res.json(result);
  } catch (err) {
    res.status(err.message === 'Address not found' ? 404 : 500).json({ error: err.message });
  }
};
