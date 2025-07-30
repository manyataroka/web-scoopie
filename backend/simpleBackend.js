const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Simple Backend is running!',
    timestamp: new Date().toISOString()
  });
});

// Simple login route
app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt:', req.body);
  
  const { login, password } = req.body;
  
  // Simple test login
  if (login === 'admin@scoopie.com' && password === 'admin123') {
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
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', server: 'Simple Backend' });
});

app.listen(PORT, () => {
  console.log(`🚀 Simple backend running on port ${PORT}`);
  console.log(`📡 Test URL: http://localhost:${PORT}`);
  console.log(`�� Login URL: http://localhost:${PORT}/api/auth/login`);
  console.log('\n📋 Test Credentials:');
  console.log('Admin: admin@scoopie.com / admin123');
  console.log('User: test@scoopie.com / password123');
}); 