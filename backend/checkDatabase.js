const { sequelize } = require('./database/db');
const User = require('./models/User');

async function checkDatabase() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Connected to database successfully');
    
    // Get all tables
    const tables = await sequelize.showAllSchemas();
    console.log('\n📊 Database Tables:');
    console.log(tables);
    
    // Get all users including admins
    const users = await User.findAll();
    console.log('\n👥 All Users:');
    users.forEach(user => {
      console.log(`- ID: ${user.id}`);
      console.log(`  Username: ${user.username}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Active: ${user.isActive}`);
      console.log(`  Created: ${user.createdAt}`);
      console.log('---');
    });
    
    // Get only admin users
    const admins = await User.findAll({
      where: { role: 'admin' }
    });
    
    console.log('\n👑 Admin Users:');
    admins.forEach(admin => {
      console.log(`- ID: ${admin.id}`);
      console.log(`  Username: ${admin.username}`);
      console.log(`  Email: ${admin.email}`);
      console.log(`  Role: ${admin.role}`);
      console.log(`  Active: ${admin.isActive}`);
      console.log('---');
    });
    
    console.log('\n💡 Note: Admin users are stored in the "Users" table with role="admin"');
    console.log('   There is no separate "Admins" table.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkDatabase(); 