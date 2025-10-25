const { sequelize, testConnection } = require('./config');
const FridgeItem = require('./models/FridgeItem');

// Initialize models
const models = {
  FridgeItem
};

// Function to sync all models with the database
async function syncDatabase() {
  try {
    // Test the connection first
    await testConnection();
    
    // Sync all models with the database
    // Changed from force: true to alter: true to preserve data between restarts
    await sequelize.sync({ alter: true }); // Use alter instead of force to preserve data
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

module.exports = {
  sequelize,
  models,
  syncDatabase
}; 