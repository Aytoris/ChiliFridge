/**
 * Meal module for managing recipe and meal functionality
 */
const MealModule = (() => {
  // State
  let allRecipes = {};
  let currentRecipe = null;
  let isInitialized = false;
  let recipeAvailability = {}; // Track which recipes are available with current ingredients

  /**
   * Initialize the meal module
   */
  const init = async () => {
    await loadRecipes();
    setupEventListeners();
    displayRecipeIngredients();
    findMissingIngredients();
    checkAllRecipesAvailability();
    isInitialized = true;

    // Notify other modules that we've loaded recipes
    // Try to refresh ingredient list in Fridge module
    if (FridgeModule && typeof FridgeModule.populateIngredientList === 'function') {
      FridgeModule.populateIngredientList();
    }

    // Force update recipe availability
    setTimeout(() => {
      checkAllRecipesAvailability();
    }, 500);
  };

  /**
   * Load recipes from the server
   */
  const loadRecipes = async () => {
    try {
      allRecipes = await API.fetchRecipes();

      // Ensure allRecipes is an object
      if (typeof allRecipes !== 'object' || allRecipes === null) {
        console.error('Recipes data is not an object:', allRecipes);
        allRecipes = {};
      }

      // Log recipe structure for debugging
      console.log('Loaded recipes structure:', Object.keys(allRecipes));
      if (Object.keys(allRecipes).length > 0) {
        const sampleRecipe = allRecipes[Object.keys(allRecipes)[0]];
        console.log('Sample recipe structure:', sampleRecipe);
      }

      populateMealSelect();

      // Dispatch an event to notify other modules that recipes are loaded
      try {
        const event = new CustomEvent('recipeDataLoaded');
        window.dispatchEvent(event);
        console.log('Recipe data loaded event dispatched');
      } catch (eventError) {
        console.error('Error dispatching recipe data loaded event:', eventError);
      }
    } catch (error) {
      console.error('Failed to load recipes:', error);
      // Initialize with empty object to prevent errors
      allRecipes = {};
    }
  };

  /**
   * Set up event listeners for meal functionality
   */
  const setupEventListeners = () => {
    const mealSelect = document.getElementById('mealSelect');

    mealSelect.addEventListener('change', () => {
      currentRecipe = mealSelect.value;
      displayRecipeIngredients();
      findMissingIngredients();
    });

    document.getElementById('peopleCountMeal').addEventListener('change', () => {
      displayRecipeIngredients();
      findMissingIngredients();
      checkAllRecipesAvailability();
      updateMealSelectAvailability();
    });

    document.getElementById('cookMealBtn').addEventListener('click', cookMeal);
    document.getElementById('addMissingBtn').addEventListener('click', addAllToGroceryList);

    // Listen for fridge updates to update recipe availability
    window.addEventListener('fridgeUpdated', () => {
      checkAllRecipesAvailability();
      updateMealSelectAvailability();
    });
  };

  /**
   * Check availability of all recipes based on current fridge contents
   */
  const checkAllRecipesAvailability = () => {
    const peopleCount = parseInt(document.getElementById('peopleCountMeal').value, 10);
    recipeAvailability = {};

    // Check each recipe
    Object.keys(allRecipes).forEach(recipeName => {
      recipeAvailability[recipeName] = isRecipeAvailable(recipeName, peopleCount);
    });

    // Update the select dropdown styling
    updateMealSelectAvailability();

    console.log('Recipe availability updated:', recipeAvailability);
  };

  /**
   * Check if a specific recipe can be made with current fridge ingredients
   * @param {string} recipeName - Name of the recipe to check
   * @param {number} peopleCount - Number of people to cook for
   * @returns {boolean} - Whether the recipe is available
   */
  const isRecipeAvailable = (recipeName, peopleCount) => {
    if (!allRecipes[recipeName]) return false;

    const recipe = allRecipes[recipeName];

    // Handle both old format (array) and new format (object with ingredients property)
    const ingredients = Array.isArray(recipe) ? recipe : recipe.ingredients;

    if (!ingredients) return false;

    // Check if all ingredients are available in sufficient quantities
    for (const recipeIngredient of ingredients) {
      const scaledQuantity = recipeIngredient.quantity * peopleCount;
      const fridgeIngredient = FridgeModule.findIngredient(recipeIngredient.name);

      // If ingredient is missing or insufficient quantity
      if (!fridgeIngredient || fridgeIngredient.quantity < scaledQuantity) {
        return false;
      }
    }

    return true;
  };

  /**
   * Update the meal select dropdown to indicate recipe availability
   */
  const updateMealSelectAvailability = () => {
    const mealSelect = document.getElementById('mealSelect');

    if (!mealSelect) {
      console.error('Meal select element not found');
      return;
    }

    console.log('Updating meal select availability');

    // Update each option's styling
    Array.from(mealSelect.options).forEach(option => {
      const recipeName = option.value;

      if (recipeName && recipeAvailability[recipeName]) {
        // Recipe is available
        option.classList.remove('recipe-unavailable');
        option.classList.add('recipe-available');
        console.log(`Recipe ${recipeName} is available`);
      } else if (recipeName) {
        // Recipe is not available
        option.classList.remove('recipe-available');
        option.classList.add('recipe-unavailable');
        console.log(`Recipe ${recipeName} is NOT available`);
      }
    });
  };

  /**
   * Populate meal select dropdown with recipe options
   */
  const populateMealSelect = () => {
    const mealSelect = document.getElementById('mealSelect');
    mealSelect.innerHTML = '';

    const mealOptions = Object.keys(allRecipes).sort();

    mealOptions.forEach(meal => {
      const option = document.createElement('option');
      option.value = meal;
      option.textContent = meal;

      // Initially mark all as unavailable until we check
      option.classList.add('recipe-unavailable');

      mealSelect.appendChild(option);
    });

    // Check availability after populating
    if (FridgeModule && typeof FridgeModule.getFridge === 'function') {
      checkAllRecipesAvailability();
    }
  };

  /**
   * Display ingredients for the selected recipe
   */
  const displayRecipeIngredients = () => {
    const mealSelect = document.getElementById('mealSelect');
    const peopleCount = parseInt(document.getElementById('peopleCountMeal').value, 10);
    const recipeIngredientsEl = document.getElementById('recipeIngredients');

    recipeIngredientsEl.innerHTML = '';

    if (!mealSelect.value) {
      return;
    }

    const selectedRecipe = allRecipes[mealSelect.value];
    currentRecipe = selectedRecipe;

    if (!selectedRecipe) {
      return;
    }

    // Handle both old format (array) and new format (object with ingredients property)
    const ingredients = Array.isArray(selectedRecipe) ? selectedRecipe : selectedRecipe.ingredients;

    if (!ingredients) {
      console.error('No ingredients found for recipe:', mealSelect.value);
      return;
    }

    ingredients.forEach(ingredient => {
      const li = document.createElement('li');
      const scaledQuantity = ingredient.quantity * peopleCount;
      li.textContent = `${ingredient.name}: ${scaledQuantity} ${ingredient.unit}`;
      recipeIngredientsEl.appendChild(li);
    });
  };

  /**
   * Cook the selected meal (remove ingredients from fridge)
   */
  const cookMeal = () => {
    const mealSelect = document.getElementById('mealSelect');
    const peopleCount = parseInt(document.getElementById('peopleCountMeal').value, 10);

    if (!mealSelect.value) {
      alert('Please select a meal to cook');
      return;
    }

    const selectedRecipe = allRecipes[mealSelect.value];
    const fridge = FridgeModule.getFridge();
    const missingIngredients = [];

    // Handle both old format (array) and new format (object with ingredients property)
    const ingredients = Array.isArray(selectedRecipe) ? selectedRecipe : selectedRecipe.ingredients;

    if (!ingredients) {
      alert('Recipe ingredients not found');
      return;
    }

    // Check if all ingredients are available
    ingredients.forEach(recipeIngredient => {
      const scaledQuantity = recipeIngredient.quantity * peopleCount;
      const fridgeIngredient = FridgeModule.findIngredient(recipeIngredient.name);

      if (!fridgeIngredient || fridgeIngredient.quantity < scaledQuantity) {
        missingIngredients.push(recipeIngredient.name);
      }
    });

    if (missingIngredients.length > 0) {
      alert(`You are missing some ingredients: ${missingIngredients.join(', ')}`);
      return;
    }

    // Remove ingredients from fridge
    ingredients.forEach(recipeIngredient => {
      const scaledQuantity = recipeIngredient.quantity * peopleCount;
      const fridgeIngredient = FridgeModule.findIngredient(recipeIngredient.name);

      if (fridgeIngredient) {
        const newQuantity = fridgeIngredient.quantity - scaledQuantity;
        const fridgeData = FridgeModule.getFridge();

        if (newQuantity <= 0) {
          delete fridgeData[fridgeIngredient.key];
        } else {
          fridgeData[fridgeIngredient.key].quantity = newQuantity;
        }
      }
    });

    API.updateFridge(FridgeModule.getFridge())
      .then(() => {
        Utility.showToast(`You cooked ${mealSelect.value}!`, 'success');
        FridgeModule.displayFridge();
        findMissingIngredients();
      })
      .catch(error => {
        console.error('Error cooking meal:', error);
      });
  };

  /**
   * Find missing ingredients for the selected recipe
   */
  const findMissingIngredients = () => {
    const mealSelect = document.getElementById('mealSelect');
    const peopleCount = parseInt(document.getElementById('peopleCountMeal').value, 10);
    const missingIngredientsEl = document.getElementById('missingIngredients');

    missingIngredientsEl.innerHTML = '';

    if (!mealSelect.value) {
      return;
    }

    const selectedRecipe = allRecipes[mealSelect.value];
    const missing = [];

    // Handle both old format (array) and new format (object with ingredients property)
    const ingredients = Array.isArray(selectedRecipe) ? selectedRecipe : selectedRecipe.ingredients;

    if (!ingredients) {
      console.error('No ingredients found for recipe:', mealSelect.value);
      return;
    }

    ingredients.forEach(recipeIngredient => {
      const scaledQuantity = recipeIngredient.quantity * peopleCount;
      const fridgeIngredient = FridgeModule.findIngredient(recipeIngredient.name);

      if (!fridgeIngredient) {
        missing.push({
          name: recipeIngredient.name,
          quantity: scaledQuantity,
          unit: recipeIngredient.unit
        });
      } else if (fridgeIngredient.quantity < scaledQuantity) {
        missing.push({
          name: recipeIngredient.name,
          quantity: scaledQuantity - fridgeIngredient.quantity,
          unit: recipeIngredient.unit
        });
      }
    });

    if (missing.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No missing ingredients!';
      missingIngredientsEl.appendChild(li);

      // Update availability state for this recipe
      recipeAvailability[mealSelect.value] = true;
      updateMealSelectAvailability();

      return;
    }

    // Update availability state for this recipe
    recipeAvailability[mealSelect.value] = false;
    updateMealSelectAvailability();

    missing.forEach(ingredient => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${ingredient.name}: ${ingredient.quantity} ${ingredient.unit}
        <button onclick="GroceryModule.addToGroceryList('${ingredient.name}', ${ingredient.quantity}, '${ingredient.unit}')">
          Add to Grocery List
        </button>
      `;
      missingIngredientsEl.appendChild(li);
    });
  };

  /**
   * Add all missing ingredients to the grocery list
   */
  const addAllToGroceryList = () => {
    const missingIngredients = document.getElementById('missingIngredients');

    if (!missingIngredients.children.length || missingIngredients.children[0].textContent === 'No missing ingredients!') {
      alert('No missing ingredients to add!');
      return;
    }

    const missingItems = Array.from(missingIngredients.children);

    missingItems.forEach(item => {
      const text = item.textContent.trim();
      const match = text.match(/(.+): (\d+\.?\d*) (.*)/);

      if (match) {
        const name = match[1];
        const quantity = parseFloat(match[2]);
        const unit = match[3];

        GroceryModule.addToGroceryList(name, quantity, unit);
      }
    });

    Utility.showToast('All missing ingredients added to grocery list!', 'success');
  };

  /**
   * Update fridge data on the server and trigger recipe availability check
   */
  const updateFridge = async (fridge) => {
    try {
      await API.updateFridge(fridge);

      // Dispatch event for fridge update
      const event = new CustomEvent('fridgeUpdated');
      window.dispatchEvent(event);

      findMissingIngredients();
    } catch (error) {
      console.error('Failed to update fridge from meal module:', error);
    }
  };

  // Public API
  return {
    init,
    getAllRecipes: () => allRecipes,
    findMissingIngredients,
    getCurrentRecipe: () => currentRecipe,
    isInitialized: () => isInitialized,
    checkAllRecipesAvailability,
    isRecipeAvailable,
    updateFridge
  };
})();