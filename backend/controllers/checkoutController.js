const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Cart = require('../models/Cart');
const User = require('../models/User');

// Generate unique order number
const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

// Create checkout (convert cart to order)
const createCheckout = async (req, res) => {
  try {
    const { deliveryAddress, phoneNumber, paymentMethod, notes } = req.body;
    const userId = req.user.id;

    // Get user's cart items
    const cartItems = await Cart.findAll({
      where: {
        userId: userId,
        isActive: true
      }
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Calculate total amount
    const totalAmount = cartItems.reduce((total, item) => {
      return total + (parseFloat(item.productPrice) * item.quantity);
    }, 0);

    // Create order
    const order = await Order.create({
      userId: userId,
      orderNumber: generateOrderNumber(),
      totalAmount: totalAmount,
      deliveryAddress: deliveryAddress || null,
      phoneNumber: phoneNumber || null,
      paymentMethod: paymentMethod || 'cash',
      notes: notes || null
    });

    // Create order items
    const orderItems = await Promise.all(
      cartItems.map(async (cartItem) => {
        const subtotal = parseFloat(cartItem.productPrice) * cartItem.quantity;
        return await OrderItem.create({
          orderId: order.id,
          productName: cartItem.productName,
          productPrice: cartItem.productPrice,
          quantity: cartItem.quantity,
          productImage: cartItem.productImage,
          subtotal: subtotal
        });
      })
    );

    // Clear cart
    await Cart.update(
      { isActive: false },
      {
        where: {
          userId: userId,
          isActive: true
        }
      }
    );

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: {
        order: order,
        orderItems: orderItems
      }
    });

  } catch (error) {
    console.error('Error creating checkout:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating checkout',
      error: error.message
    });
  }
};

// Get user's orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.findAll({
      where: {
        userId: userId,
        isActive: true
      },
      include: [
        {
          model: OrderItem,
          as: 'orderItems'
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('Error getting user orders:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting orders',
      error: error.message
    });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      where: {
        id: orderId,
        userId: userId,
        isActive: true
      },
      include: [
        {
          model: OrderItem,
          as: 'orderItems'
        }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting order',
      error: error.message
    });
  }
};

// Update order status (for admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    await order.update({ status });

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });

  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order status',
      error: error.message
    });
  }
};

// Get all orders (for admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        isActive: true
      },
      include: [
        {
          model: OrderItem,
          as: 'orderItems'
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error('Error getting all orders:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting orders',
      error: error.message
    });
  }
};

module.exports = {
  createCheckout,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders
}; 