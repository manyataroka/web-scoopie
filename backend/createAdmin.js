const User = require('./models/User');
const { sequelize } = require('./database/db');

async function createAdminUser() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('Database connected successfully.');
    
    // Sync database
    await sequelize.sync({ alter: true });
    console.log('Database synced.');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: { 
        [require('sequelize').Op.or]: [
          { email: 'admin@scoopie.com' },
          { username: 'admin' }
        ]
      }
    });
    
    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('📧 Email: admin@scoopie.com');
      console.log('👤 Username: admin');
      console.log('🔑 Password: admin123');
      console.log('👑 Role: ' + existingAdmin.role);
      return;
    }
    
    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@scoopie.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isActive: true
    });
    
    console.log('Admin user created successfully!');
    console.log('Email: admin@scoopie.com');
    console.log('Password: admin123');
    console.log('Username: admin');
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await sequelize.close();
  }
}

createAdminUser(); 