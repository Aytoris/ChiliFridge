const { models, sequelize } = require('../database');
const FridgeItem = models.FridgeItem;

/**
 * Get all fridge items
 * @returns {Promise<Object>} - Fridge items
 */
async function getFridgeItems() {
  try {
    console.log('Fetching all fridge items from database...');
    // Get all items from the database
    const items = await FridgeItem.findAll();
    console.log(`Found ${items.length} items in the fridge database`);
    
    // Convert to a more convenient format for the frontend
    // Using an object with item ids as keys
    const fridgeData = {};
    items.forEach(item => {
      fridgeData[item.id] = {
        name: item.name,
        quantity: item.quantity,
        unit: item.unit,
        category: item.category,
        dateAdded: item.dateAdded
      };
    });
    
    return fridgeData;
  } catch (error) {
    console.error('Error fetching fridge items:', error);
    throw error;
  }
}

/**
 * Update fridge items
 * @param {Object} fridgeData - The updated fridge data
 * @returns {Promise<void>}
 */
async function updateFridgeItems(fridgeData) {
  try {
    console.log('Updating fridge items with data:', JSON.stringify(fridgeData, null, 2));
    
    // Start a transaction
    console.log('Starting database transaction...');
    const transaction = await sequelize.transaction();
    
    try {
      // Get all current items
      console.log('Fetching current items from database...');
      const currentItems = await FridgeItem.findAll({ transaction });
      const currentItemIds = currentItems.map(item => item.id);
      console.log('Current items in database:', currentItemIds);
      
      // Process each item in the new data
      console.log('Processing items to update or create...');
      for (const [id, details] of Object.entries(fridgeData)) {
        if (currentItemIds.includes(id)) {
          // Update existing item
          console.log(`Updating existing item: ${id}`);
          await FridgeItem.update({
            name: details.name,
            quantity: details.quantity,
            unit: details.unit,
            category: details.category
          }, {
            where: { id },
            transaction
          });
        } else {
          // Create new item
          console.log(`Creating new item: ${id}`);
          await FridgeItem.create({
            id,
            name: details.name,
            quantity: details.quantity,
            unit: details.unit,
            category: details.category
          }, { transaction });
        }
      }
      
      // Remove items that are no longer in the new data
      const newItemIds = Object.keys(fridgeData);
      const itemsToRemove = currentItemIds.filter(id => !newItemIds.includes(id));
      
      if (itemsToRemove.length > 0) {
        console.log(`Removing items no longer in fridge: ${itemsToRemove.join(', ')}`);
        await FridgeItem.destroy({
          where: {
            id: itemsToRemove
          },
          transaction
        });
      }
      
      // Commit the transaction
      console.log('Committing transaction...');
      await transaction.commit();
      console.log('Fridge update completed successfully');
      
      return { message: 'Fridge updated successfully' };
    } catch (error) {
      // Rollback the transaction on error
      console.error('Error in transaction, rolling back:', error);
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    console.error('Error updating fridge items:', error);
    throw error;
  }
}

module.exports = {
  getFridgeItems,
  updateFridgeItems
}; 