// routes/auth.js
const express = require('express');
const { sendOTP, verifyOTP } = require('../controllers/authController');

const router = express.Router();

router.post('/sendOtp', sendOTP);
router.post('/verifyOtp', verifyOTP);

module.exports = router;
