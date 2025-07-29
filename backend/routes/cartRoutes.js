const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartCount
} = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/auth');

// All cart routes require authentication
router.use(authenticateToken);

// Add item to cart
router.post('/add', addToCart);

// Get user's cart
router.get('/', getCart);

// Get cart count
router.get('/count', getCartCount);

// Update cart item quantity
router.put('/item/:cartItemId', updateCartItem);

// Remove item from cart
router.delete('/item/:cartItemId', removeFromCart);

// Clear entire cart
router.delete('/clear', clearCart);

module.exports = router; 