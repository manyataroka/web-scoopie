const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/db');
const axios = require('axios');

// Test database connection
async function testDatabaseConnection() {
  console.log('🔍 Testing Database Connection...');
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
    
    // Test if tables exist
    const tables = await sequelize.showAllSchemas();
    console.log('📊 Available tables:', tables.length);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Test backend server
async function testBackendServer() {
  console.log('\n🔍 Testing Backend Server...');
  try {
    const response = await axios.get('http://localhost:5001/');
    console.log('✅ Backend server is running!');
    console.log('📡 Response:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Backend server test failed:', error.message);
    return false;
  }
}

// Test frontend server
async function testFrontendServer() {
  console.log('\n🔍 Testing Frontend Server...');
  try {
    const response = await axios.get('http://localhost:5173/');
    console.log('✅ Frontend server is running!');
    console.log(' Status:', response.status);
    return true;
  } catch (error) {
    console.error('❌ Frontend server test failed:', error.message);
    return false;
  }
}

// Test API endpoints
async function testAPIEndpoints() {
  console.log('\n🔍 Testing API Endpoints...');
  
  const endpoints = [
    { name: 'Products API', url: 'http://localhost:5001/api/products' },
    { name: 'Health Check', url: 'http://localhost:5001/health' }
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(endpoint.url);
      console.log(`✅ ${endpoint.name}: Working`);
    } catch (error) {
      console.log(`❌ ${endpoint.name}: Failed - ${error.message}`);
    }
  }
}

// Main test function
async function runAllTests() {
  console.log('🚀 Starting Connection Tests...\n');
  
  const dbConnected = await testDatabaseConnection();
  const backendRunning = await testBackendServer();
  const frontendRunning = await testFrontendServer();
  
  if (backendRunning) {
    await testAPIEndpoints();
  }
  
  console.log('\n Test Summary:');
  console.log(`Database: ${dbConnected ? '✅ Connected' : '❌ Failed'}`);
  console.log(`Backend: ${backendRunning ? '✅ Running' : '❌ Failed'}`);
  console.log(`Frontend: ${frontendRunning ? '✅ Running' : '❌ Failed'}`);
  
  if (dbConnected && backendRunning && frontendRunning) {
    console.log('\n🎉 All systems are connected and working!');
  } else {
    console.log('\n⚠️  Some systems are not working properly. Check the errors above.');
  }
  
  process.exit(0);
}

// Run tests
runAllTests().catch(console.error); 