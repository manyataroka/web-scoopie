const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
async function testDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
    
    // Sync database
    await sequelize.sync({ force: false });
    console.log('✅ Database synced successfully!');
    
    // Check if users exist
    const userCount = await User.count();
    console.log(`�� Number of users in database: ${userCount}`);
    
    if (userCount === 0) {
      console.log('⚠️  No users found. Creating test users...');
      await createTestUsers();
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database error:', error.message);
    return false;
  }
}

// Create test users
async function createTestUsers() {
  try {
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
    console.log('✅ Admin user created:', adminUser.email);

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
    console.log('✅ Test user created:', testUser.email);
  } catch (error) {
    console.error('❌ Error creating users:', error.message);
  }
}

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('🔐 Login attempt:', req.body);
    
    const { login, password } = req.body;

    // Validation
    if (!login || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email/username and password are required'
      });
    }

    // Find user by email or username
    const user = await User.findOne({
      where: {
        [require('sequelize').Op.or]: [
          { email: login },
          { username: login }
        ]
      }
    });

    if (!user) {
      console.log('❌ User not found:', login);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      console.log('❌ User is deactivated:', login);
      return res.status(401).json({
        success: false,
        message: 'Account is deactivated'
      });
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      console.log('❌ Invalid password for user:', login);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ Login successful for user:', login);

    res.json({
      success: true,
      message: 'Login successful',
      user: user.toJSON(),
      token: 'test-token-123'
    });

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    });
  }
});

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Login Test Server is running!',
    endpoints: {
      login: 'POST /api/auth/login',
      test: 'GET /'
    }
  });
});

// Start server
async function startServer() {
  console.log('🚀 Starting Login Test Server...\n');
  
  const dbConnected = await testDatabase();
  if (!dbConnected) {
    console.error('❌ Cannot start server - database connection failed');
    process.exit(1);
  }
  
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 Test URL: http://localhost:${PORT}`);
    console.log(`�� Login URL: http://localhost:${PORT}/api/auth/login`);
    console.log('\n🎉 Login test server is ready!');
    console.log('\n📋 Test Credentials:');
    console.log('Admin: admin@scoopie.com / admin123');
    console.log('User: test@scoopie.com / password123');
  });
}

startServer(); 