const express = require('express');
const router = express.Router();
const {
  sendVerificationCode,
  verifyCodeAndResetPassword,
  verifyCode
} = require('../controllers/forgotPasswordController');

// Send verification code
router.post('/send-code', sendVerificationCode);

// Verify code only
router.post('/verify-code', verifyCode);

// Verify code and reset password
router.post('/reset-password', verifyCodeAndResetPassword);

module.exports = router; 