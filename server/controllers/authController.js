// controllers/authController.js
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000); // valid for 2 mins

  try {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      user = await User.create({ email });
    }

    await user.update({ otp, otpExpiresAt });

    // Setup email
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or another email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${otp}. It is valid for 2 minutes.`,
    });

    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

exports.verifyOTP = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      const user = await User.findOne({ where: { email } });
  
      if (!user || user.otp !== otp || new Date() > user.otpExpiresAt) {
        return res.status(401).json({ message: 'Invalid or expired OTP' });
      }
  
      // Clear OTP after successful verification
      await user.update({ otp: null, otpExpiresAt: null });
  
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '2d',
      });
  
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('OTP verification failed:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };