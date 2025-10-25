/**
 * Calendar module for managing calendar functionality
 */
const CalendarModule = (() => {
  // State
  // New structure for calendar data to support multiple meals per day with people counts
  let calendarData = [];
  const MEAL_COUNT = 3; // Number of meal slots per day (without specific labels)

  /**
   * Initialize the calendar module
   */
  const init = () => {
    console.log('Calendar init called');
    setupEventListeners();

    // Initialize calendar data structure if empty
    if (!calendarData || calendarData.length === 0) {
      initializeCalendarData();
    }

    // Immediately try to display the calendar
    displayCalendar();

    // Even if no recipes are available yet, still show the calendar structure
    if (!MealModule.getAllRecipes() || Object.keys(MealModule.getAllRecipes()).length === 0) {
      // Listen for the recipe data loaded event
      window.addEventListener('recipeDataLoaded', () => {
        console.log('Recipes loaded event received by calendar');
        displayCalendar();
      });
    }
  };

  /**
   * Initialize empty calendar data structure
   */
  const initializeCalendarData = () => {
    calendarData = [];

    // Create 7 days
    for (let i = 0; i < 7; i++) {
      const dayMeals = [];

      // Create 3 meal slots per day (without specific meal types)
      for (let j = 0; j < MEAL_COUNT; j++) {
        dayMeals.push({
          recipe: '',
          peopleCount: 2 // Default to 2 people
        });
      }

      calendarData.push(dayMeals);
    }

    // Try to load saved data from localStorage
    loadCalendarData();
  };

  /**
   * Set up event listeners for calendar functionality
   */
  const setupEventListeners = () => {
    document.getElementById('addWeeklyGroceryListButton').addEventListener('click', addWeeklyGroceryList);
    document.getElementById('clearCalendarButton').addEventListener('click', clearCalendar);
  };

  /**
   * Display the calendar with days of the week
   */
  const displayCalendar = () => {
    console.log('Display calendar called');
    const calendarEl = document.getElementById('calendar');

    if (!calendarEl) {
      console.error('Calendar element not found');
      return;
    }

    calendarEl.innerHTML = '';

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const currentDay = today.getDay();

    // Make sure calendar data is initialized
    if (!calendarData || calendarData.length === 0) {
      initializeCalendarData();
    }

    // Create a card for each day
    for (let i = 0; i < 7; i++) {
      const dayIndex = (currentDay + i) % 7;
      const dayCard = document.createElement('div');
      dayCard.className = 'day-card';
      dayCard.id = `day-${i}`;

      // Add day name
      const dayNameDiv = document.createElement('div');
      dayNameDiv.className = 'day-name';
      dayNameDiv.textContent = daysOfWeek[dayIndex];
      dayCard.appendChild(dayNameDiv);

      // Create meal containers for each meal slot (without specific meal types)
      for (let mealIndex = 0; mealIndex < MEAL_COUNT; mealIndex++) {
        const mealContainer = document.createElement('div');
        mealContainer.className = 'meal-container';

        // Create select dropdown with recipe options
        const selectElement = document.createElement('select');
        selectElement.className = 'meal-selector';
        selectElement.id = `meal-day-${i}-${mealIndex}`;
        selectElement.setAttribute('data-day', i);
        selectElement.setAttribute('data-meal', mealIndex);
        selectElement.addEventListener('change', (e) => updateMealSelection(i, mealIndex, e.target.value));

        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '...';
        selectElement.appendChild(defaultOption);

        // Add recipe options if available
        const recipes = MealModule.getAllRecipes();
        if (recipes && Object.keys(recipes).length > 0) {
          Object.keys(recipes)
            .sort()
            .forEach(recipe => {
              const option = document.createElement('option');
              option.value = recipe;
              option.textContent = recipe;
              selectElement.appendChild(option);
            });
        }

        // Set the selected value if there's saved data
        if (calendarData[i] && calendarData[i][mealIndex]) {
          selectElement.value = calendarData[i][mealIndex].recipe || '';

          // Add a class if a recipe is selected to highlight it visually
          if (calendarData[i][mealIndex].recipe) {
            mealContainer.classList.add('meal-active');
          }
        }

        mealContainer.appendChild(selectElement);

        // Add people count selector
        const peopleContainer = document.createElement('div');
        peopleContainer.style.display = 'flex';
        peopleContainer.style.alignItems = 'center';
        peopleContainer.style.marginTop = '5px';

        const peopleLabel = document.createElement('label');
        peopleLabel.textContent = 'People: ';
        peopleLabel.setAttribute('for', `people-day-${i}-${mealIndex}`);
        peopleContainer.appendChild(peopleLabel);

        const peopleSelect = document.createElement('select');
        peopleSelect.className = 'people-selector';
        peopleSelect.id = `people-day-${i}-${mealIndex}`;
        peopleSelect.setAttribute('data-day', i);
        peopleSelect.setAttribute('data-meal', mealIndex);
        peopleSelect.addEventListener('change', (e) => updatePeopleCount(i, mealIndex, parseInt(e.target.value, 10)));

        // Add options for people count
        for (let p = 1; p <= 8; p++) {
          const option = document.createElement('option');
          option.value = p;
          option.textContent = p;
          peopleSelect.appendChild(option);
        }

        // Set the selected value if there's saved data
        if (calendarData[i] && calendarData[i][mealIndex]) {
          peopleSelect.value = calendarData[i][mealIndex].peopleCount || 2;
        }

        peopleContainer.appendChild(peopleSelect);
        mealContainer.appendChild(peopleContainer);

        // Add "Cook This" button if a recipe is selected
        if (calendarData[i] && calendarData[i][mealIndex] && calendarData[i][mealIndex].recipe) {
          const cookButton = document.createElement('button');
          cookButton.className = 'cook-button';
          cookButton.textContent = 'Cook This';
          cookButton.setAttribute('data-day', i);
          cookButton.setAttribute('data-meal', mealIndex);
          cookButton.setAttribute('data-recipe', calendarData[i][mealIndex].recipe);

          // Make sure we're using the correct people count from the meal planner
          const mealPeopleCount = calendarData[i][mealIndex].peopleCount || 2;
          cookButton.setAttribute('data-people', mealPeopleCount);

          // Use a direct function reference instead of an arrow function
          cookButton.onclick = function() {
            const recipe = this.getAttribute('data-recipe');
            const people = parseInt(this.getAttribute('data-people'), 10);
            console.log(`Cook button clicked for ${recipe} for ${people} people`);
            openCookingMode(recipe, people);
          };

          peopleContainer.appendChild(cookButton);
        }

        dayCard.appendChild(mealContainer);
      }

      calendarEl.appendChild(dayCard);
    }
  };

  /**
   * Update meal selection for a specific day and meal
   * @param {number} dayIndex - Day index (0-6)
   * @param {number} mealIndex - Meal index (0-2)
   * @param {string} recipeName - Selected recipe name
   */
  const updateMealSelection = (dayIndex, mealIndex, recipeName) => {
    // Ensure calendarData is initialized
    if (!calendarData[dayIndex]) {
      calendarData[dayIndex] = [];
    }

    // Ensure meal data exists
    if (!calendarData[dayIndex][mealIndex]) {
      calendarData[dayIndex][mealIndex] = { recipe: '', peopleCount: 2 };
    }

    // Update the recipe
    calendarData[dayIndex][mealIndex].recipe = recipeName;

    // Update the visual highlight based on selection
    const mealContainer = document.getElementById(`meal-day-${dayIndex}-${mealIndex}`).closest('.meal-container');
    if (recipeName) {
      mealContainer.classList.add('meal-active');
    } else {
      mealContainer.classList.remove('meal-active');
    }

    // Save the updated data
    saveCalendarData();
  };

  /**
   * Update people count for a specific day and meal
   * @param {number} dayIndex - Day index (0-6)
   * @param {number} mealIndex - Meal index (0-2)
   * @param {number} peopleCount - Number of people
   */
  const updatePeopleCount = (dayIndex, mealIndex, peopleCount) => {
    // Ensure calendarData is initialized
    if (!calendarData[dayIndex]) {
      calendarData[dayIndex] = [];
    }

    // Ensure meal data exists
    if (!calendarData[dayIndex][mealIndex]) {
      calendarData[dayIndex][mealIndex] = { recipe: '', peopleCount: 2 };
    }

    // Update the people count
    calendarData[dayIndex][mealIndex].peopleCount = peopleCount;

    // Update the "Cook This" button's data-people attribute if it exists
    const cookButton = document.querySelector(`button.cook-button[data-day="${dayIndex}"][data-meal="${mealIndex}"]`);
    if (cookButton) {
      cookButton.setAttribute('data-people', peopleCount);
    }

    // Save to localStorage
    saveCalendarData();
  };

  /**
   * Save calendar data to localStorage
   */
  const saveCalendarData = () => {
    try {
      localStorage.setItem('calendarData', JSON.stringify(calendarData));
      console.log('Calendar data saved to localStorage');
    } catch (error) {
      console.error('Error saving calendar data:', error);
    }
  };

  /**
   * Load calendar data from localStorage
   */
  const loadCalendarData = () => {
    try {
      const savedData = localStorage.getItem('calendarData');

      if (savedData) {
        calendarData = JSON.parse(savedData);
        console.log('Calendar data loaded from localStorage');
      }
    } catch (error) {
      console.error('Error loading calendar data:', error);
      // Initialize with default data if loading fails
      initializeCalendarData();
    }
  };

  /**
   * Calculate total ingredients needed for all calendar meals
   * @returns {Array} - Array of required ingredients
   */
  const calculateTotalIngredients = () => {
    const recipes = MealModule.getAllRecipes();
    const totalIngredients = [];

    // Go through each day
    calendarData.forEach(dayMeals => {
      // Go through each meal of the day
      dayMeals.forEach(meal => {
        if (!meal.recipe || !recipes[meal.recipe]) return;

        const recipe = recipes[meal.recipe];
        const peopleCount = meal.peopleCount || 2;

        // Add each ingredient to the total
        recipe.forEach(recipeIngredient => {
          const existingIngredient = totalIngredients.find(ing =>
            ing.name.toLowerCase() === recipeIngredient.name.toLowerCase()
          );

          if (existingIngredient) {
            existingIngredient.quantity += recipeIngredient.quantity * peopleCount;
          } else {
            totalIngredients.push({
              name: recipeIngredient.name,
              quantity: recipeIngredient.quantity * peopleCount,
              unit: recipeIngredient.unit
            });
          }
        });
      });
    });

    return totalIngredients;
  };

  /**
   * Add all weekly grocery items to the grocery list
   */
  const addWeeklyGroceryList = () => {
    const totalIngredients = calculateTotalIngredients();

    if (totalIngredients.length === 0) {
      Utility.showToast('No recipes selected in the calendar!', 'warning');
      return;
    }

    // Check what's missing compared to fridge
    const missingIngredients = [];

    totalIngredients.forEach(ingredient => {
      const fridgeIngredient = FridgeModule.findIngredient(ingredient.name);

      if (!fridgeIngredient) {
        missingIngredients.push(ingredient);
      } else if (fridgeIngredient.quantity < ingredient.quantity) {
        missingIngredients.push({
          name: ingredient.name,
          quantity: ingredient.quantity - fridgeIngredient.quantity,
          unit: ingredient.unit
        });
      }
    });

    // Add missing ingredients to grocery list
    if (missingIngredients.length === 0) {
      Utility.showToast('You have all the ingredients needed for the weekly meals!', 'success');
      return;
    }

    missingIngredients.forEach(ingredient => {
      GroceryModule.addToGroceryList(ingredient.name, ingredient.quantity, ingredient.unit);
    });

    Utility.showToast('Weekly grocery items added to the grocery list!', 'success');
  };

  /**
   * Clear all meal selections from the calendar
   */
  const clearCalendar = () => {
    if (confirm('Are you sure you want to clear all meal selections?')) {
      // First remove from localStorage to prevent reloading the data
      localStorage.removeItem('calendarData');

      // Reset the calendar data (without loading from localStorage)
      calendarData = [];

      // Create 7 days with empty meals
      for (let i = 0; i < 7; i++) {
        const dayMeals = [];

        // Create meal slots per day
        for (let j = 0; j < MEAL_COUNT; j++) {
          dayMeals.push({
            recipe: '',
            peopleCount: 2 // Default to 2 people
          });
        }

        calendarData.push(dayMeals);
      }

      // Refresh the calendar display with the empty data
      displayCalendar();

      Utility.showToast('Meal planner has been cleared!', 'info');
    }
  };

  /**
   * Open cooking mode for a specific recipe
   * @param {string} recipeName - Name of the recipe
   * @param {number} peopleCount - Number of people
   */
  const openCookingMode = (recipeName, peopleCount) => {
    console.log(`Opening cooking mode for ${recipeName} for ${peopleCount} people`);

    // Get recipe data
    const recipes = MealModule.getAllRecipes();
    if (!recipes || !recipes[recipeName]) {
      console.error(`Recipe not found: ${recipeName}`);
      return;
    }

    const recipe = recipes[recipeName];

    // Set modal title
    document.getElementById('cookingModeTitle').textContent = recipeName;

    // Set servings display to match the meal planner setting
    // Ensure the peopleCount is valid
    const validPeopleCount = Math.min(Math.max(1, peopleCount), 8);
    document.getElementById('cookingModeServingsDisplay').textContent = validPeopleCount;

    // Populate ingredients list with the correct people count from the meal planner
    populateCookingModeIngredients(recipe, validPeopleCount);

    // Populate instructions
    populateCookingModeInstructions(recipe);

    // Show the modal
    const modal = document.getElementById('cookingModeModal');
    modal.style.display = 'block';

    // Add event listener for close button
    document.getElementById('closeCookingMode').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });

    // Add escape key listener to close modal
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
      }
    });
  };

  /**
   * Populate cooking mode ingredients list
   * @param {Object} recipe - Recipe object
   * @param {number} peopleCount - Number of people
   */
  const populateCookingModeIngredients = (recipe, peopleCount) => {
    const ingredientsList = document.getElementById('cookingModeIngredients');
    ingredientsList.innerHTML = '';

    console.log('Recipe data:', recipe);

    // Check if recipe is an array (old format) or object with ingredients property (new format)
    let ingredients = [];

    if (Array.isArray(recipe)) {
      // Old format - array of ingredients
      ingredients = recipe.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit
      }));
    } else if (recipe.ingredients) {
      // New format - object with ingredients property
      ingredients = Object.entries(recipe.ingredients).map(([name, details]) => ({
        name,
        quantity: details.quantity,
        unit: details.unit
      }));
    } else {
      console.error('Unsupported recipe format:', recipe);
      const li = document.createElement('li');
      li.textContent = 'No ingredients found for this recipe.';
      ingredientsList.appendChild(li);
      return;
    }

    if (ingredients.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No ingredients found for this recipe.';
      ingredientsList.appendChild(li);
      return;
    }

    // Calculate the scaling factor based on the recipe's default servings
    const defaultServings = recipe.servings || 1;
    const scalingFactor = peopleCount / defaultServings;

    // Add each ingredient to the list
    ingredients.forEach(ingredient => {
      const li = document.createElement('li');

      // Create ingredient name span
      const nameSpan = document.createElement('span');
      nameSpan.className = 'ingredient-name';
      nameSpan.textContent = ingredient.name;
      li.appendChild(nameSpan);

      // Create quantity span
      const quantitySpan = document.createElement('span');
      quantitySpan.className = 'ingredient-quantity';

      // Scale the quantity based on people count
      let quantity = ingredient.quantity * scalingFactor;

      // Format the quantity (round to 2 decimal places if needed)
      if (Number.isInteger(quantity)) {
        quantitySpan.textContent = `${quantity} ${ingredient.unit || ''}`;
      } else {
        quantitySpan.textContent = `${quantity.toFixed(2)} ${ingredient.unit || ''}`;
      }

      li.appendChild(quantitySpan);
      ingredientsList.appendChild(li);
    });
  };

  /**
   * Populate cooking mode instructions
   * @param {Object} recipe - Recipe object
   */
  const populateCookingModeInstructions = (recipe) => {
    const instructionsDiv = document.getElementById('cookingModeInstructions');
    instructionsDiv.innerHTML = '';

    // Check if recipe has instructions in different formats
    let instructions = [];

    if (Array.isArray(recipe.instructions)) {
      // New format with instructions array
      instructions = recipe.instructions;
    } else if (recipe.steps && Array.isArray(recipe.steps)) {
      // Alternative format with steps array
      instructions = recipe.steps;
    } else if (recipe.method && Array.isArray(recipe.method)) {
      // Alternative format with method array
      instructions = recipe.method;
    } else if (recipe.preparation && typeof recipe.preparation === 'string') {
      // Format with a single preparation string
      instructions = [recipe.preparation];
    } else if (Array.isArray(recipe) && recipe.length > 0) {
      // If recipe is just an array of ingredients with no instructions
      instructionsDiv.textContent = 'No detailed instructions available for this recipe.';
      return;
    }

    if (instructions.length === 0) {
      instructionsDiv.textContent = 'No instructions available for this recipe.';
      return;
    }

    // Create ordered list for instructions
    const ol = document.createElement('ol');

    // Add each instruction step
    instructions.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      ol.appendChild(li);
    });

    instructionsDiv.appendChild(ol);
  };

  // Public API
  return {
    init,
    displayCalendar,
    addWeeklyGroceryList,
    clearCalendar,
    getCalendarData: () => calendarData,
    openCookingMode
  };
})();