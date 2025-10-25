const recipeModel = require('../models/recipeModel');

/**
 * Get all recipes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getRecipes(req, res) {
  try {
    const recipes = await recipeModel.getRecipes();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}

/**
 * Get a recipe by name
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getRecipeByName(req, res) {
  try {
    const { name } = req.params;
    const recipe = await recipeModel.getRecipeByName(name);
    
    if (!recipe) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }
    
    res.status(200).json(recipe);
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
}

/**
 * Get all unique ingredients from all recipes
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function getAllIngredients(req, res) {
  try {
    const ingredients = await recipeModel.getAllIngredients();
    res.status(200).json(ingredients);
  } catch (error) {
    console.error('Error fetching ingredients:', error);
    res.status(500).json({ error: 'Failed to fetch ingredients' });
  }
}

module.exports = {
  getRecipes,
  getRecipeByName,
  getAllIngredients
}; 