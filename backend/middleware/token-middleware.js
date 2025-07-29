const jwt = require('jsonwebtoken');

// Generate access token
const generateToken = (userId, email, role) => {
  return jwt.sign(
    { 
      userId, 
      email, 
      role 
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '1h' 
    }
  );
};

// Generate refresh token
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { 
      userId,
      type: 'refresh' 
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '7d' 
    }
  );
};

// Verify refresh token
const verifyRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    return decoded;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken
};