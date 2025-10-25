const fs = require('fs');
const path = require('path');
const { models, syncDatabase } = require('./index');

const fridgeFilePath = path.join(__dirname, '../../fridge.json');

/**
 * Migrate data from fridge.json to the database
 */
async function migrateData() {
  try {
    console.log('Starting migration from fridge.json to database...');
    
    // Initialize the database
    await syncDatabase();
    
    // Check if fridge.json exists
    if (!fs.existsSync(fridgeFilePath)) {
      console.log('fridge.json file not found. Migration skipped.');
      return;
    }
    
    // Read the fridge.json file
    const data = fs.readFileSync(fridgeFilePath, 'utf8');
    const fridgeData = JSON.parse(data);
    
    // Check if there's any data to migrate
    if (Object.keys(fridgeData).length === 0) {
      console.log('No data found in fridge.json. Migration skipped.');
      return;
    }
    
    // Migrate each item to the database
    const migrationPromises = Object.entries(fridgeData).map(([name, details]) => {
      return models.FridgeItem.create({
        name,
        quantity: details.quantity || 1,
        unit: details.unit || null,
        category: details.category || null,
        dateAdded: details.dateAdded || new Date()
      });
    });
    
    await Promise.all(migrationPromises);
    
    console.log(`Migration complete. ${Object.keys(fridgeData).length} items migrated.`);
    
    // Create a backup of the original file
    const backupPath = fridgeFilePath + '.backup';
    fs.copyFileSync(fridgeFilePath, backupPath);
    console.log(`Original data backed up to ${backupPath}`);
    
    // Clear the original file (optional)
    fs.writeFileSync(fridgeFilePath, '{}', 'utf8');
    console.log('Original file cleared.');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run the migration if this script is executed directly
if (require.main === module) {
  migrateData()
    .then(() => {
      console.log('Migration script completed.');
      process.exit(0);
    })
    .catch(error => {
      console.error('Migration script failed:', error);
      process.exit(1);
    });
}

module.exports = migrateData; 