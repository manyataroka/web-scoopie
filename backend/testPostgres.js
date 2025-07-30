const { Client } = require('pg');

async function testPostgres() {
  console.log('�� Testing PostgreSQL Connection...\n');
  
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'admin123', // Change this to your actual password
    database: 'postgres' // Connect to default database first
  });

  try {
    // Test connection
    await client.connect();
    console.log('✅ Connected to PostgreSQL successfully!');
    
    // Test if we can query
    const result = await client.query('SELECT version()');
    console.log('✅ PostgreSQL version:', result.rows[0].version);
    
    // Check if scoopie_db exists
    const dbResult = await client.query(`
      SELECT datname FROM pg_database WHERE datname = 'scoopie_db'
    `);
    
    if (dbResult.rows.length > 0) {
      console.log('✅ Database "scoopie_db" exists');
    } else {
      console.log('⚠️  Database "scoopie_db" does not exist');
      console.log('   Creating database...');
      
      await client.query('CREATE DATABASE scoopie_db');
      console.log('✅ Database "scoopie_db" created successfully');
    }
    
    // Test connection to scoopie_db
    await client.end();
    
    const scoopieClient = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'admin123', // Change this to your actual password
      database: 'scoopie_db'
    });
    
    await scoopieClient.connect();
    console.log('✅ Connected to scoopie_db successfully!');
    await scoopieClient.end();
    
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error.message);
    console.error('Full error:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 PostgreSQL is not running!');
      console.log('   Start PostgreSQL:');
      console.log('   macOS: brew services start postgresql');
      console.log('   Ubuntu: sudo systemctl start postgresql');
      console.log('   Windows: Start PostgreSQL service from Services');
    } else if (error.code === '28P01') {
      console.log('\n💡 Authentication failed!');
      console.log('   Check your PostgreSQL password in .env file');
    } else if (error.code === '3D000') {
      console.log('\n💡 Database does not exist!');
      console.log('   Run: node setupDatabase.js');
    }
  }
}

testPostgres(); 