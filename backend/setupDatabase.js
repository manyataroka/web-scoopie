const { Client } = require('pg');

async function setupDatabase() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'postgres',
    password: 'admin123' // Update this with your actual PostgreSQL password
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');

    // Create database if it doesn't exist
    try {
      await client.query('CREATE DATABASE scoopie_db');
      console.log('✅ Database "scoopie_db" created successfully');
    } catch (error) {
      if (error.code === '42P04') {
        console.log('ℹ️  Database "scoopie_db" already exists');
      } else {
        throw error;
      }
    }

    console.log('✅ Database setup completed!');
    console.log('📊 Database: scoopie_db');
    console.log('👤 User: postgres');

  } catch (error) {
    console.error('❌ Error setting up database:', error);
  } finally {
    await client.end();
  }
}

setupDatabase(); 