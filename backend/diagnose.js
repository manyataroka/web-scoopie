const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

console.log('�� Starting diagnosis...\n');

// 1. Check environment variables
console.log('1. Environment Variables:');
console.log('   PORT:', process.env.PORT || '5001 (default)');
console.log('   DB_HOST:', process.env.DB_HOST || 'localhost (default)');
console.log('   DB_USER:', process.env.DB_USER || 'postgres (default)');
console.log('   DB_NAME:', process.env.DB_NAME || 'scoopie_db (default)');
console.log('   DB_PORT:', process.env.DB_PORT || '5432 (default)');
console.log('   JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'NOT SET');
console.log('');

// 2. Test database connection
async function testDataba 