const Cart = require('../models/Cart');
const User = require('../models/User');

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, productName, productPrice, quantity = 1, productImage } = req.body;
    const userId = req.user.id;

    // Validation
    if (!productId || !productName || !productPrice) {
      return res.status(400).json({
        success: false,
        message: 'Product ID, name, and price are required'
      });
    }

    // Check if item already exists in cart
    const existingItem = await Cart.findOne({
      where: {
        userId,
        productId,
        isActive: true
      }
    });

    if (existingItem) {
      // Update quantity if item already exists
      await existingItem.update({
        quantity: existingItem.quantity + quantity
      });

      return res.json({
        success: true,
        message: 'Item quantity updated in cart',
        data: existingItem
      });
    }

    // Add new item to cart
    const cartItem = await Cart.create({
      userId,
      productId,
      productName,
      productPrice,
      quantity,
      productImage
    });

    res.status(201).json({
      success: true,
      message: 'Item added to cart successfully',
      data: cartItem
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while adding to cart'
    });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cartItems = await Cart.findAll({
      where: {
        userId,
        isActive: true
      },
      order: [['createdAt', 'DESC']]
    });

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (parseFloat(item.productPrice) * item.quantity);
    }, 0);

    res.json({
      success: true,
      data: {
        items: cartItems,
        total: total.toFixed(2),
        itemCount: cartItems.length
      }
    });

  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching cart'
    });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
    const userId = req.user.id;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Valid quantity is required'
      });
    }

    const cartItem = await Cart.findOne({
      where: {
        id: cartItemId,
        userId,
        isActive: true
      }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    await cartItem.update({ quantity });

    res.json({
      success: true,
      message: 'Cart item updated successfully',
      data: cartItem
    });

  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating cart item'
    });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const userId = req.user.id;

    const cartItem = await Cart.findOne({
      where: {
        id: cartItemId,
        userId,
        isActive: true
      }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    await cartItem.update({ isActive: false });

    res.json({
      success: true,
      message: 'Item removed from cart successfully'
    });

  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing from cart'
    });
  }
};

// Clear entire cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    await Cart.update(
      { isActive: false },
      {
        where: {
          userId,
          isActive: true
        }
      }
    );

    res.json({
      success: true,
      message: 'Cart cleared successfully'
    });

  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while clearing cart'
    });
  }
};

// Get cart count
const getCartCount = async (req, res) => {
  try {
    const userId = req.user.id;

    const count = await Cart.count({
      where: {
        userId,
        isActive: true
      }
    });

    res.json({
      success: true,
      data: { count }
    });

  } catch (error) {
    console.error('Get cart count error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while getting cart count'
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartCount
}; 