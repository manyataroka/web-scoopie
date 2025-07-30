const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/login',(req,res)=>{
  res.json({
    success: true,
    message: 'Login route is working!'
  });
})

// Protected routes (require authentication)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, changePassword);

// Test route to check if auth is working
router.get('/test', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Authentication is working!',
    user: req.user.toJSON()
  });
});

module.exports = router;