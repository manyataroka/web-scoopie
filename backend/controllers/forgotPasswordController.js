const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const { User } = require('../models/User');

// Store verification codes in memory (in production, use Redis or database)
const verificationCodes = new Map();

// Email transporter configuration
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

// Twilio client configuration (only if credentials are provided)
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && 
    process.env.TWILIO_ACCOUNT_SID !== 'your-account-sid' && 
    process.env.TWILIO_AUTH_TOKEN !== 'your-auth-token') {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

// Generate 6-digit verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification code via email
const sendEmailCode = async (email, code) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Scoopie - Password Reset Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e91e63;">Scoopie Password Reset</h2>
          <p>You requested a password reset for your Scoopie account.</p>
          <p>Your verification code is:</p>
          <h1 style="color: #e91e63; font-size: 48px; text-align: center; letter-spacing: 8px;">${code}</h1>
          <p>This code will expire in 10 minutes.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>The Scoopie Team</p>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    return false;
  }
};

// Send verification code via SMS
const sendSMSCode = async (phoneNumber, code) => {
  try {
    if (!twilioClient) {
      console.error('Twilio client not initialized. Cannot send SMS.');
      return false;
    }
    await twilioClient.messages.create({
      body: `Your Scoopie verification code is: ${code}. This code will expire in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER || '+1234567890',
      to: phoneNumber
    });
    return true;
  } catch (error) {
    console.error('SMS sending error:', error);
    return false;
  }
};

// Send verification code
const sendVerificationCode = async (req, res) => {
  try {
    const { contactType, contactValue } = req.body;

    if (!contactType || !contactValue) {
      return res.status(400).json({ 
        success: false, 
        error: 'Contact type and value are required' 
      });
    }

    // Check if user exists
    let user;
    if (contactType === 'email') {
      user = await User.findOne({ where: { email: contactValue } });
    } else {
      user = await User.findOne({ where: { phone: contactValue } });
    }

    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: 'No account found with this contact information' 
      });
    }

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store verification code
    verificationCodes.set(contactValue, {
      code: verificationCode,
      expiresAt: expiresAt,
      userId: user.id
    });

    // Send verification code
    let sent = false;
    if (contactType === 'email') {
      sent = await sendEmailCode(contactValue, verificationCode);
    } else {
      sent = await sendSMSCode(contactValue, verificationCode);
    }

    if (!sent) {
      return res.status(500).json({ 
        success: false, 
        error: `Failed to send verification code to ${contactType}` 
      });
    }

    res.json({ 
      success: true, 
      message: `Verification code sent to your ${contactType}` 
    });

  } catch (error) {
    console.error('Send verification code error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

// Verify code and reset password
const verifyCodeAndResetPassword = async (req, res) => {
  try {
    const { contactValue, verificationCode, newPassword } = req.body;

    if (!contactValue || !verificationCode || !newPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Contact value, verification code, and new password are required' 
      });
    }

    // Check if verification code exists and is valid
    const storedData = verificationCodes.get(contactValue);
    
    if (!storedData) {
      return res.status(400).json({ 
        success: false, 
        error: 'No verification code found. Please request a new code.' 
      });
    }

    if (new Date() > storedData.expiresAt) {
      verificationCodes.delete(contactValue);
      return res.status(400).json({ 
        success: false, 
        error: 'Verification code has expired. Please request a new code.' 
      });
    }

    if (storedData.code !== verificationCode) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid verification code' 
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user password
    await User.update(
      { password: hashedPassword },
      { where: { id: storedData.userId } }
    );

    // Remove verification code
    verificationCodes.delete(contactValue);

    res.json({ 
      success: true, 
      message: 'Password reset successfully' 
    });

  } catch (error) {
    console.error('Verify code and reset password error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

// Verify code only (for step 2)
const verifyCode = async (req, res) => {
  try {
    const { contactValue, verificationCode } = req.body;

    if (!contactValue || !verificationCode) {
      return res.status(400).json({ 
        success: false, 
        error: 'Contact value and verification code are required' 
      });
    }

    // Check if verification code exists and is valid
    const storedData = verificationCodes.get(contactValue);
    
    if (!storedData) {
      return res.status(400).json({ 
        success: false, 
        error: 'No verification code found. Please request a new code.' 
      });
    }

    if (new Date() > storedData.expiresAt) {
      verificationCodes.delete(contactValue);
      return res.status(400).json({ 
        success: false, 
        error: 'Verification code has expired. Please request a new code.' 
      });
    }

    if (storedData.code !== verificationCode) {
      return res.status(400).json({ 
        success: false, 
        error: 'Invalid verification code' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Code verified successfully' 
    });

  } catch (error) {
    console.error('Verify code error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};

module.exports = {
  sendVerificationCode,
  verifyCodeAndResetPassword,
  verifyCode
}; 