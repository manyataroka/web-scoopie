const { sequelize } = require('./database/db');
const User = require('./models/User');

async function updateAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Find the admin user
    const adminUser = await User.findOne({
      where: { email: 'admin@example.com' }
    });
    
    if (adminUser) {
      // Update the user to have admin role
      await adminUser.update({ role: 'admin' });
      console.log('Admin user updated successfully:', adminUser.toJSON());
    } else {
      console.log('Admin user not found');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating admin user:', error);
    process.exit(1);
  }
}

updateAdmin(); 