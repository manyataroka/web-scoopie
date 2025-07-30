const { sequelize } = require('./database/db');
const Order = require('./models/Order');
const OrderItem = require('./models/OrderItem');
const User = require('./models/User');

async function testOrders() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Check if tables exist
    const orders = await Order.findAll();
    console.log('Total orders in database:', orders.length);
    
    const orderItems = await OrderItem.findAll();
    console.log('Total order items in database:', orderItems.length);
    
    const users = await User.findAll();
    console.log('Total users in database:', users.length);
    
    if (orders.length > 0) {
      console.log('Sample order:', JSON.stringify(orders[0], null, 2));
    }
    
    if (orderItems.length > 0) {
      console.log('Sample order item:', JSON.stringify(orderItems[0], null, 2));
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

testOrders(); 