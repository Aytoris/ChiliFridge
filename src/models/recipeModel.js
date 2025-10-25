const fs = require('fs');
const path = require('path');
const { safelyParseJson } = require('../utils/fileUtils');

const recipesFilePath = path.join(__dirname, '../../recipes.json');

/**
 * Get all recipes
 * @returns {Promise<Object>} - All recipes
 */
function getRecipes() {
  return new Promise((resolve, reject) => {
    fs.readFile(recipesFilePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      
      try {
        // Use our enhanced JSON parser that handles BOM and other issues
        const recipesData = safelyParseJson(data);
        resolve(recipesData);
      } catch (parseError) {
        console.error('Error parsing recipes.json:', parseError.message);
        // Provide more information about the parsing error
        console.error('First few characters of recipes.json:', data.substring(0, 50));
        reject(parseError);
      }
    });
  });
}

/**
 * Get a recipe by name
 * @param {string} recipeName - The name of the recipe
 * @returns {Promise<Array|null>} - Recipe ingredients or null if not found
 */
async function getRecipeByName(recipeName) {
  try {
    const recipes = await getRecipes();
    return recipes[recipeName] || null;
  } catch (error) {
    console.error(`Error getting recipe "${recipeName}":`, error.message);
    throw error;
  }
}

/**
 * Get all unique ingredients from all recipes
 * @returns {Promise<string[]>} - Sorted array of unique ingredients
 */
async function getAllIngredients() {
  try {
    const recipes = await getRecipes();
    const ingredients = new Set();
    
    Object.values(recipes).forEach(recipe => {
      if (Array.isArray(recipe)) {
        recipe.forEach(ingredient => {
          if (ingredient && ingredient.name) {
            ingredients.add(ingredient.name);
          }
        });
      }
    });
    
    return Array.from(ingredients).sort();
  } catch (error) {
    console.error('Error getting all ingredients:', error.message);
    // Return empty array instead of throwing
    return [];
  }
}

module.exports = {
  getRecipes,
  getRecipeByName,
  getAllIngredients
}; 