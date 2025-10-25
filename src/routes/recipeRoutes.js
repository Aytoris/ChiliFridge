const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');

// Get all recipes
router.get('/', recipeController.getRecipes);

// Get a recipe by name
router.get('/:name', recipeController.getRecipeByName);

// Get all unique ingredients
router.get('/ingredients/all', recipeController.getAllIngredients);

module.exports = router; 