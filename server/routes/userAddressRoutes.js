const express = require('express');
const router = express.Router();
const userAddressController = require('../controllers/userAddressController');

router.post('/', userAddressController.createAddress);
router.get('/:userId', userAddressController.getUserAddresses);
router.put('/:addressId', userAddressController.updateAddress);
router.delete('/:addressId', userAddressController.deleteAddress);

module.exports = router;

