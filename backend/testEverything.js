const { sequelize } = require('./database/db');
const User = require('./models/User');

async function testEverything() {
  try {
    console.log('�� Testing everything...\n');
    
    // 1. Test database connection
    console.log('1. Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!\n');
    
    // 2. Test if tables exist
    console.log('2. Testing database tables...');
    const tables = await sequelize.showAllSchemas();
    console.log('✅ Available tables:', tables.length, '\n');
    
    // 3. Test if users exist
    console.log('3. Testing users...');
    const userCount = await User.count();
    console.log('✅ Number of users in database:', userCount, '\n');
    
    // 4. List all users
    console.log('4. Listing all users:');
    const users = await User.findAll();
    if (users.length === 0) {
      console.log('❌ No users found in database!');
      console.log('   Run: node createAdmin.js');
      console.log('   Run: node createTestUser.js\n');
    } else {
      users.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.email} (${user.username}) - Role: ${user.role} - Active: ${user.isActive}`);
      });
      console.log('');
    }
    
    // 5. Test specific users
    console.log('5. Testing specific users:');
    
    const admin = await User.findOne({ where: { email: 'admin@scoopie.com' } });
    if (admin) {
      console.log('✅ Admin user exists:', admin.email);
    } else {
      console.log('❌ Admin user not found');
    }
    
    const testUser = await User.findOne({ where: { email: 'test@scoopie.com' } });
    if (testUser) {
      console.log('✅ Test user exists:', testUser.email);
    } else {
      console.log('❌ Test user not found');
    }
    
    console.log('\n🎉 Database test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Full error:', error);
  } finally {
    await sequelize.close();
  }
}

testEverything(); 