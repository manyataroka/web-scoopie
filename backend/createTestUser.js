const User = require('./models/User');
const { sequelize } = require('./database/db');

async function createTestUser() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    // Check if test user already exists
    const existingUser = await User.findOne({
      where: {
        email: 'test@scoopie.com'
      }
    });

    if (existingUser) {
      console.log('ℹ️  Test user already exists');
      console.log('Email: test@scoopie.com');
      console.log('Password: password123');
      return;
    }

    // Create test user
    const testUser = await User.create({
      username: 'testuser',
      email: 'test@scoopie.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      isActive: true
    });

    console.log('✅ Test user created successfully');
    console.log('Email: test@scoopie.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('❌ Error creating test user:', error);
  } finally {
    await sequelize.close();
  }
}

createTestUser(); 