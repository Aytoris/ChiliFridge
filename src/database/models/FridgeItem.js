const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

// Define the FridgeItem model
const FridgeItem = sequelize.define('FridgeItem', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true // Using id (timestamp) as the primary key
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 1
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true
  },
  dateAdded: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  // Model options
  tableName: 'fridge_items',
  timestamps: true, // Adds createdAt and updatedAt
});

module.exports = FridgeItem; 