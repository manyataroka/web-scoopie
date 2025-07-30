console.log('🔍 Testing Node.js and dependencies...\n');

// Test 1: Basic Node.js
console.log('1. Node.js version:', process.version);
console.log('2. Platform:', process.platform);
console.log('3. Architecture:', process.arch);

// Test 2: Try to require Express
try {
  const express = require('express');
  console.log('4. ✅ Express is installed');
} catch (error) {
  console.log('4. ❌ Express is NOT installed:', error.message);
}

// Test 3: Try to require CORS
try {
  const cors = require('cors');
  console.log('5. ✅ CORS is installed');
} catch (error) {
  console.log('5. ❌ CORS is NOT installed:', error.message);
}

// Test 4: Try to require Sequelize
try {
  const { Sequelize } = require('sequelize');
  console.log('6. ✅ Sequelize is installed');
} catch (error) {
  console.log('6. ❌ Sequelize is NOT installed:', error.message);
}

// Test 5: Try to require PostgreSQL
try {
  const { Client } = require('pg');
  console.log('7. ✅ PostgreSQL driver is installed');
} catch (error) {
  console.log('7. ❌ PostgreSQL driver is NOT installed:', error.message);
}

// Test 6: Create a simple Express server
try {
  const express = require('express');
  const app = express();
  const PORT = 5001;

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Server is working!' });
  });

  app.listen(PORT, () => {
    console.log(`🚀 Minimal server running on port ${PORT}`);
  });
  
} catch (error) {
  console.log('8. ❌ Express server test failed:', error.message);
}

console.log('\n🎉 Dependency test completed!'); 