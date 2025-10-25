const fridgeModel = require('../models/fridgeModel');

/**
 * Get all fridge items
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getFridge(req, res) {
  console.log('GET /api/fridge - Fetching all fridge items');
  try {
    const fridgeData = await fridgeModel.getFridgeItems();
    console.log('Successfully fetched fridge data');
    res.status(200).json(fridgeData);
  } catch (error) {
    console.error('Error fetching fridge data:', error);
    res.status(500).json({ error: 'Failed to fetch fridge data' });
  }
}

/**
 * Update fridge items
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function updateFridge(req, res) {
  console.log('POST /api/fridge/update - Updating fridge items');
  try {
    const fridgeData = req.body;
    console.log('Request body:', JSON.stringify(fridgeData, null, 2));
    
    if (!fridgeData || Object.keys(fridgeData).length === 0) {
      console.error('Empty fridge data received');
      return res.status(400).json({ error: 'No fridge data provided' });
    }
    
    await fridgeModel.updateFridgeItems(fridgeData);
    console.log('Fridge updated successfully');
    res.status(200).json({ message: 'Fridge updated successfully' });
  } catch (error) {
    console.error('Error updating fridge data:', error);
    res.status(500).json({ error: 'Failed to update fridge data' });
  }
}

module.exports = {
  getFridge,
  updateFridge
}; 