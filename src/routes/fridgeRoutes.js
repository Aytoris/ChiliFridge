const express = require('express');
const router = express.Router();
const fridgeController = require('../controllers/fridgeController');

// Get all fridge items
router.get('/', fridgeController.getFridge);

// Update fridge items
router.post('/update', fridgeController.updateFridge);

module.exports = router; 