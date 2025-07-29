const express = require('express');
const router = express.Router();
const {
  createCheckout,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/checkoutController');
const { authenticateToken } = require('../middleware/auth');

// All checkout routes require authentication
router.use(authenticateToken);

// Create checkout (convert cart to order)
router.post('/create', createCheckout);

// Get user's orders
router.get('/orders', getUserOrders);

// Get specific order by ID
router.get('/orders/:orderId', getOrderById);

// Update order status (admin only)
router.put('/orders/:orderId/status', updateOrderStatus);

// Get all orders (admin only)
router.get('/admin/orders', getAllOrders);

module.exports = router; 