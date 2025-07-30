const { sequelize } = require('./database/db');
const User = require('./models/User');

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
    
    // Test if tables exist
    const tables = await sequelize.showAllSchemas();
    console.log('📊 Available tables:', tables.length);
    
    // Test if users table has data
    const userCount = await User.count();
    console.log('�� Number of users in database:', userCount);
    
    // List all users
    const users = await User.findAll();
    console.log('\n�� Users in database:');
    users.forEach(user => {
      console.log(`- ${user.email} (${user.username}) - Role: ${user.role}`);
    });
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await sequelize.close();
  }
}

testDatabase(); 