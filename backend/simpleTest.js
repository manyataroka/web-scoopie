const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5001;

// Basic CORS
app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Simple login test route
app.post('/api/auth/login', (req, res) => {
  console.log('Login attempt:', req.body);
  res.json({ 
    success: true, 
    message: 'Login test successful',
    user: { email: 'test@test.com', role: 'user' },
    token: 'test-token'
  });
});

app.listen(PORT, () => {
  console.log(`�� Simple test server running on port ${PORT}`);
  console.log(`📡 Test URL: http://localhost:${PORT}`);
}); 