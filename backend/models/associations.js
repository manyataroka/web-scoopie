const User = require('./User');
const Cart = require('./Cart');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Product = require('./Product');

// User associations
User.hasMany(Cart, { foreignKey: 'userId', as: 'cartItems' });
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });

// Cart associations
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Order associations
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });

// OrderItem associations
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// Product associations (if needed in the future)
// Products are standalone entities

// Export models for use in other files
module.exports = {
  User,
  Cart,
  Order,
  OrderItem,
  Product
}; 