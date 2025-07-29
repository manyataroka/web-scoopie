const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  upload
} = require('../controllers/productController');

// Public routes (for user menu)
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);

// Protected routes (admin only)
router.post('/products', authenticateToken, upload, createProduct);
router.put('/products/:id', authenticateToken, upload, updateProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

// Serve uploaded images
router.get('/uploads/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/${filename}`;
  res.sendFile(filePath, { root: '.' });
});

module.exports = router; 