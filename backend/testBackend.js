const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001; // Different port

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Test Backend is running!',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Login route
app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt received:', req.body);
  
  const { login, password } = req.body;
  
  if (login === 'admin@scoopie.com' && password === 'admin123') {
    console.log('✅ Admin login successful');
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: 1,
        email: 'admin@scoopie.com',
        username: 'admin',
        role: 'admin'
      },
      token: 'test-token-123'
    });
  } else if (login === 'test@scoopie.com' && password === 'password123') {
    console.log('✅ User login successful');
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: 2,
        email: 'test@scoopie.com',
        username: 'testuser',
        role: 'user'
      },
      token: 'test-token-456'
    });
  } else {
    console.log('❌ Login failed for:', login);
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    server: 'Test Backend',
    port: PORT,
    uptime: process.uptime()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Test backend running on port ${PORT}`);
  console.log(`📡 Test URL: http://localhost:${PORT}`);
  console.log(` Login URL: http://localhost:${PORT}/api/auth/login`);
  console.log('\n📋 Test Credentials:');
  console.log('Admin: admin@scoopie.com / admin123');
  console.log('User: test@scoopie.com / password123');
  console.log('\n🎉 Backend is ready for testing!');
});

// Handle errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled Rejection:', error);
}); 