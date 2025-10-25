const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

// Ensure the data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory:', dataDir);
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'fridge.sqlite');
console.log('Database path:', dbPath);

// Create a Sequelize instance with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: console.log // Enable SQL query logging
});

// Test the connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error; // Re-throw to allow proper error handling upstream
  }
}

module.exports = {
  sequelize,
  testConnection
}; 