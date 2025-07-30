const { sequelize } = require('./database/db');
const User = require('./models/User');

async function createAdmin() {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Sync database
    await sequelize.sync({ alter: true });
    console.log('Database synced.');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: { email: 'admin@example.com' }
    });
    
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.toJSON());
      return;
    }
    
    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@example.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin'
    });
    
    console.log('Admin user created successfully:', adminUser.toJSON());
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    process.exit(0);
  }
}

createAdmin(); 