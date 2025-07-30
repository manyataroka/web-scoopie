const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/db');
const User = require('./models/User');

// Test database connection
async function testDatabaseConnection() {
  console.log('🔍 Testing Database Connection...');
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
    
    // Test if tables exist
    const tables = await sequelize.showAllSchemas();
    console.log('📊 Available tables:', tables.length);
    
    // Test if users exist
    const userCount = await User.count();
    console.log('�� Number of users in database:', userCount);
    
    if (userCount === 0) {
      console.log('⚠️  No users found! Creating test users...');
      await createTestUsers();
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Create test users
async function createTestUsers() {
  try {
    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@scoopie.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      isActive: true
    });
    console.log('✅ Admin user created:', adminUser.email);

    // Create test user
    const testUser = await User.create({
      username: 'testuser',
      email: 'testuser@scoopie.com',
      password: 'test123',
      firstName: 'Test',
      lastName: 'User',
      role: 'user',
      isActive: true
    });
    console.log('✅ Test user created:', testUser.email);
  } catch (error) {
    console.error('❌ Error creating test users:', error.message);
  }
} 