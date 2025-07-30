const { Client } = require('pg');

async function quickTest() {
  console.log('🔍 Quick PostgreSQL Test...\n');
  
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '', // Try empty password first
    database: 'postgres'
  });

  try {
    await client.connect();
    console.log('✅ PostgreSQL is running and accessible!');
    await client.end();
    return true;
  } catch (error) {
    console.log('❌ PostgreSQL test failed:', error.message);
    
    // Try with common passwords
    const passwords = ['admin123', 'password', 'postgres', ''];
    
    for (const password of passwords) {
      try {
        const testClient = new Client({
          host: 'localhost',
          port: 5432,
          user: 'postgres',
          password: password,
          database: 'postgres'
        });
        
        await testClient.connect();
        console.log(`✅ PostgreSQL works with password: "${password}"`);
        await testClient.end();
        
        // Update .env file with working password
        const fs = require('fs');
        const envContent = `# Database Configuration
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=${password}
DB_NAME=scoopie_db
DB_PORT=5432

# JWT Secret
JWT_SECRET=scoopie_super_secret_jwt_key_2024_make_it_very_long_and_secure

# Server Configuration
PORT=5001
`;
        
        fs.writeFileSync('.env', envContent);
        console.log('✅ Updated .env file with working password');
        return true;
      } catch (err) {
        // Continue to next password
      }
    }
    
    console.log('❌ Could not connect with any common password');
    return false;
  }
}

quickTest().then(success => {
  if (success) {
    console.log('\n🎉 PostgreSQL is ready! Now run: npm run dev');
  } else {
    console.log('\n💡 PostgreSQL needs to be started or configured');
  }
}); 