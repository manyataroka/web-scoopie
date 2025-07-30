console.log('Starting debug server...');

try {
  const express = require('express');
  console.log('✅ Express loaded');
  
  const cors = require('cors');
  console.log('✅ CORS loaded');
  
  const bcrypt = require('bcryptjs');
  console.log('✅ bcryptjs loaded');
  
  const jwt = require('jsonwebtoken');
  console.log('✅ jsonwebtoken loaded');

  const app = express();
  const PORT = 5001;

  console.log('✅ Express app created');

  // Middleware
  app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
  }));
  console.log('✅ CORS middleware added');
  
  app.use(express.json());
  console.log('✅ JSON middleware added');

  // Simple test route
  app.get('/', (req, res) => {
    res.json({ message: 'Debug server is working!' });
  });
  console.log('✅ Test route added');

  // Start server
  app.listen(PORT, () => {
    console.log(`🚀 Debug server running on port ${PORT}`);
  });

} catch (error) {
  console.error('❌ Error starting server:', error.message);
  console.error('Full error:', error);
} 