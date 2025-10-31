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

      // Mark the current day (i === 0 means today)
      if (i === 0) {
        dayCard.classList.add('current-day');
      }

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

            // Add protein-specific styling based on recipe
            const selectedRecipe = calendarData[i][mealIndex].recipe;
            if (recipes && recipes[selectedRecipe] && recipes[selectedRecipe].protein) {
              applyProteinStyling(mealContainer, recipes[selectedRecipe].protein, true);
              applyProteinSelectorStyling(selectElement, recipes[selectedRecipe].protein);
            }
          }
        }        mealContainer.appendChild(selectElement);

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

    // Scroll to current day after rendering
    scrollToCurrentDay();
  };

  /**
   * Get protein color for a given protein type
   * @param {string} proteinType - Protein type
   * @param {boolean} isActive - Whether the meal is active/selected
   * @returns {string} - Color code
   */
  const getProteinColor = (proteinType, isActive = false) => {
    const colors = {
      'tofu': { base: '#FFF59D', active: '#FFD54F' },
      'lentils': { base: '#FFAB91', active: '#FF7043' },
      'chickpeas': { base: '#FFCC80', active: '#FFA726' },
      'beans': { base: '#BCAAA4', active: '#8D6E63' },
      'eggs': { base: '#F48FB1', active: '#EC407A' },
      'fish': { base: '#81D4FA', active: '#29B6F6' },
      'chicken': { base: '#EF9A9A', active: '#EF5350' },
      'dairy': { base: '#CE93D8', active: '#AB47BC' },
      'none': { base: '#BDBDBD', active: '#9E9E9E' }
    };

    const color = colors[proteinType] || colors['none'];
    return isActive ? color.active : color.base;
  };

  /**
   * Apply protein styling to a meal container
   * @param {HTMLElement} mealContainer - The meal container element
   * @param {string|array} protein - Protein type(s) from recipe
   * @param {boolean} isActive - Whether the meal is active/selected
   */
  const applyProteinStyling = (mealContainer, protein, isActive = false) => {
    // Remove all existing protein classes
    mealContainer.classList.remove(
      'protein-tofu', 'protein-lentils', 'protein-chickpeas', 'protein-beans',
      'protein-eggs', 'protein-fish', 'protein-chicken', 'protein-dairy', 'protein-none'
    );

    // Clear any inline background style
    mealContainer.style.background = '';

    if (!protein) return;

    // Handle array of proteins (multi-protein)
    if (Array.isArray(protein)) {
      if (protein.length === 0) return;

      // Always create striped pattern for arrays, even with 1 item
      const stripeWidth = 100 / protein.length;
      const stripes = protein.map((p, index) => {
        const color = getProteinColor(p, isActive);
        const start = index * stripeWidth;
        const end = (index + 1) * stripeWidth;
        return `${color} ${start}%, ${color} ${end}%`;
      }).join(', ');

      mealContainer.style.background = `linear-gradient(90deg, ${stripes})`;
    } else {
      // Single protein string - use solid color instead of CSS class
      const color = getProteinColor(protein, isActive);
      mealContainer.style.background = color;
    }
  };  /**
   * Apply protein color to meal selector
   * @param {HTMLElement} selectElement - The select element
   * @param {string|array} protein - Protein type(s) from recipe
   */
  const applyProteinSelectorStyling = (selectElement, protein) => {
    selectElement.classList.remove('has-protein');
    selectElement.style.borderLeft = '';
    selectElement.style.borderImage = '';
    selectElement.style.borderImageSlice = '';

    if (!protein) return;

    selectElement.classList.add('has-protein');

    // Handle array of proteins (multi-protein)
    if (Array.isArray(protein)) {
      if (protein.length === 0) return;

      // Always create striped border for arrays
      const stripeHeight = 100 / protein.length;
      const stripes = protein.map((p, index) => {
        const color = getProteinColor(p, false);
        const start = index * stripeHeight;
        const end = (index + 1) * stripeHeight;
        return `${color} ${start}%, ${color} ${end}%`;
      }).join(', ');

      selectElement.style.borderLeft = '6px solid';
      selectElement.style.borderImage = `linear-gradient(180deg, ${stripes}) 1`;
    } else {
      // Single protein string
      const color = getProteinColor(protein, false);
      selectElement.style.borderLeft = `6px solid ${color}`;
    }
  };

  /**
   * Update meal selection for a specific day and meal  /**
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
    const selectElement = document.getElementById(`meal-day-${dayIndex}-${mealIndex}`);
    const mealContainer = selectElement.closest('.meal-container');

    if (recipeName) {
      mealContainer.classList.add('meal-active');

      // Get the protein type from the recipe and apply styling
      const recipes = MealModule.getAllRecipes();
      if (recipes[recipeName] && recipes[recipeName].protein) {
        applyProteinStyling(mealContainer, recipes[recipeName].protein, true);
        applyProteinSelectorStyling(selectElement, recipes[recipeName].protein);
      }
    } else {
      mealContainer.classList.remove('meal-active');
      applyProteinStyling(mealContainer, null, false);
      applyProteinSelectorStyling(selectElement, null);
    }

    // Save the updated data
    saveCalendarData();

    // Update the "Cook This" button immediately
    updateCookButton(dayIndex, mealIndex, recipeName);
  };  /**
   * Update or create the "Cook This" button for a meal
   * @param {number} dayIndex - Day index (0-6)
   * @param {number} mealIndex - Meal index (0-2)
   * @param {string} recipeName - Selected recipe name
   */
  const updateCookButton = (dayIndex, mealIndex, recipeName) => {
    const peopleContainer = document.querySelector(`#people-day-${dayIndex}-${mealIndex}`).parentElement;

    // Remove existing cook button if any
    const existingButton = peopleContainer.querySelector('.cook-button');
    if (existingButton) {
      existingButton.remove();
    }

    // Add new cook button if a recipe is selected
    if (recipeName) {
      const cookButton = document.createElement('button');
      cookButton.className = 'cook-button';
      cookButton.textContent = 'Cook This';
      cookButton.setAttribute('data-day', dayIndex);
      cookButton.setAttribute('data-meal', mealIndex);
      cookButton.setAttribute('data-recipe', recipeName);

      // Get the current people count
      const peopleCount = calendarData[dayIndex][mealIndex].peopleCount || 2;
      cookButton.setAttribute('data-people', peopleCount);

      // Add click handler
      cookButton.onclick = function() {
        const recipe = this.getAttribute('data-recipe');
        const people = parseInt(this.getAttribute('data-people'), 10);
        console.log(`Cook button clicked for ${recipe} for ${people} people`);
        openCookingMode(recipe, people);
      };

      peopleContainer.appendChild(cookButton);
    }
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

        // Handle both old format (array) and new format (object with ingredients property)
        const ingredients = Array.isArray(recipe) ? recipe : recipe.ingredients;

        if (!ingredients) {
          console.error('No ingredients found for recipe:', meal.recipe);
          return;
        }

        // Add each ingredient to the total
        ingredients.forEach(recipeIngredient => {
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
   * Scroll to the current day in the calendar
   */
  const scrollToCurrentDay = () => {
    // Use setTimeout to ensure the DOM is fully rendered
    setTimeout(() => {
      const currentDayCard = document.querySelector('.day-card.current-day');
      const calendarContainer = document.querySelector('.calendar-container');

      if (currentDayCard && calendarContainer) {
        // Calculate the scroll position to center the current day
        const cardLeft = currentDayCard.offsetLeft;
        const cardWidth = currentDayCard.offsetWidth;
        const containerWidth = calendarContainer.offsetWidth;

        // Center the card in the viewport
        const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);

        calendarContainer.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
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

    // Populate timers
    populateCookingModeTimers(recipe);

    // Show the modal
    const modal = document.getElementById('cookingModeModal');
    modal.style.display = 'block';
    document.body.classList.add('modal-open'); // Prevent background scrolling

    // Add event listener for close button
    const closeModal = () => {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open'); // Re-enable background scrolling

      // Clear all active timers when closing the modal
      activeTimers.forEach(timer => {
        if (timerIntervals[timer.id]) {
          clearInterval(timerIntervals[timer.id]);
          delete timerIntervals[timer.id];
        }
      });
      activeTimers = [];
    };    document.getElementById('closeCookingMode').onclick = closeModal;

    // Close modal when clicking outside
    window.onclick = (event) => {
      if (event.target === modal) {
        closeModal();
      }
    };

    // Add escape key listener to close modal
    const handleEscape = (event) => {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
      }
    };

    // Remove old listener if exists and add new one
    document.removeEventListener('keydown', handleEscape);
    document.addEventListener('keydown', handleEscape);
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
    } else if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
      // New format - object with ingredients array property
      ingredients = recipe.ingredients.map(item => ({
        name: item.name,
        quantity: item.quantity,
        unit: item.unit
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

  /**
   * Populate cooking mode timers
   * @param {Object} recipe - Recipe object
   */
  const populateCookingModeTimers = (recipe) => {
    const timersContainer = document.getElementById('cookingTimersContainer');
    const timersSection = document.getElementById('cookingTimersSection');

    timersContainer.innerHTML = '';

    // Check if recipe has timers
    if (!recipe.timers || !Array.isArray(recipe.timers) || recipe.timers.length === 0) {
      timersSection.style.display = 'none';
      return;
    }

    timersSection.style.display = 'block';

    // Add each timer as a button
    recipe.timers.forEach((timer, index) => {
      const timerBtn = document.createElement('button');
      timerBtn.className = 'timer-button';
      timerBtn.dataset.timerId = index;
      timerBtn.dataset.duration = timer.duration;
      timerBtn.dataset.label = timer.label;

      const labelSpan = document.createElement('span');
      labelSpan.className = 'timer-label';
      labelSpan.textContent = timer.label;

      const durationSpan = document.createElement('span');
      durationSpan.className = 'timer-duration';
      const minutes = Math.floor(timer.duration);
      const seconds = Math.round((timer.duration % 1) * 60);
      if (seconds > 0) {
        durationSpan.textContent = `${minutes}m ${seconds}s`;
      } else {
        durationSpan.textContent = `${minutes} min`;
      }

      timerBtn.appendChild(labelSpan);
      timerBtn.appendChild(durationSpan);

      timerBtn.addEventListener('click', () => {
        startTimer(timer.label, timer.duration);
      });

      timersContainer.appendChild(timerBtn);
    });
  };

    // Active timers tracking
  let activeTimers = [];
  let timerIntervals = {};

  /**
   * Start a new timer
   * @param {string} label - Timer label
   * @param {number} duration - Duration in minutes
   */
  const startTimer = (label, duration) => {
    // Check if timer with same label is already running
    if (activeTimers.find(t => t.label === label)) {
      Utility.showToast(`Timer "${label}" is already running!`, 'warning');
      return;
    }

    const timerId = `timer-${Date.now()}`;
    const durationInSeconds = duration * 60;
    const endTime = Date.now() + (durationInSeconds * 1000);

    const timer = {
      id: timerId,
      label: label,
      duration: durationInSeconds,
      endTime: endTime,
      remainingSeconds: durationInSeconds
    };

    activeTimers.push(timer);
    transformTimerButton(timer);
    startTimerInterval(timer);

    Utility.showToast(`Timer "${label}" started for ${duration} minutes`, 'success');
  };

  /**
   * Transform the timer button into an active countdown display
   * @param {Object} timer - Timer object
   */
  const transformTimerButton = (timer) => {
    // Find the timer button by label
    const timersContainer = document.getElementById('cookingTimersContainer');
    const buttons = timersContainer.querySelectorAll('.timer-button');

    let timerBtn = null;
    buttons.forEach(btn => {
      if (btn.dataset.label === timer.label && !btn.classList.contains('timer-active')) {
        timerBtn = btn;
      }
    });

    if (!timerBtn) return;

    // Store the timer ID on the button
    timerBtn.dataset.activeTimerId = timer.id;

    // Add active class
    timerBtn.classList.add('timer-active');

    // Create header with label and stop button
    const headerDiv = document.createElement('div');
    headerDiv.className = 'timer-active-header';

    const labelSpan = document.createElement('span');
    labelSpan.className = 'timer-active-label';
    labelSpan.textContent = timer.label;

    const stopBtn = document.createElement('button');
    stopBtn.className = 'timer-stop-btn';
    stopBtn.textContent = 'Stop';
    stopBtn.onclick = (e) => {
      e.stopPropagation();
      stopTimer(timer.id);
    };

    headerDiv.appendChild(labelSpan);
    headerDiv.appendChild(stopBtn);

    // Create countdown display
    const displayDiv = document.createElement('div');
    displayDiv.className = 'timer-countdown-display';
    displayDiv.id = `${timer.id}-display`;
    displayDiv.textContent = formatTime(timer.remainingSeconds);

    // Create progress bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'timer-progress-bar';

    const progressBar = document.createElement('div');
    progressBar.className = 'timer-progress';
    progressBar.id = `${timer.id}-progress`;
    progressBar.style.width = '100%';

    progressBarContainer.appendChild(progressBar);

    // Add all new elements to button
    timerBtn.appendChild(headerDiv);
    timerBtn.appendChild(displayDiv);
    timerBtn.appendChild(progressBarContainer);
  };

  /**
   * Start the interval for a timer
   * @param {Object} timer - Timer object
   */
  const startTimerInterval = (timer) => {
    const interval = setInterval(() => {
      const now = Date.now();
      const remainingMs = timer.endTime - now;
      const remainingSeconds = Math.max(0, Math.ceil(remainingMs / 1000));

      timer.remainingSeconds = remainingSeconds;

      // Find the button
      const timersContainer = document.getElementById('cookingTimersContainer');
      const timerBtn = timersContainer.querySelector(`[data-active-timer-id="${timer.id}"]`);

      if (!timerBtn) {
        clearInterval(interval);
        delete timerIntervals[timer.id];
        return;
      }

      // Update display
      const displayDiv = document.getElementById(`${timer.id}-display`);
      const progressBar = document.getElementById(`${timer.id}-progress`);

      if (displayDiv) {
        displayDiv.textContent = formatTime(remainingSeconds);
      }

      if (progressBar) {
        const percentage = (remainingSeconds / timer.duration) * 100;
        progressBar.style.width = `${percentage}%`;
      }

      // Update button styling based on remaining time
      if (remainingSeconds <= 10) {
        timerBtn.classList.remove('timer-warning');
        timerBtn.classList.add('timer-critical');
      } else if (remainingSeconds <= 60) {
        timerBtn.classList.remove('timer-critical');
        timerBtn.classList.add('timer-warning');
      } else {
        timerBtn.classList.remove('timer-warning', 'timer-critical');
      }

      // Timer finished
      if (remainingSeconds <= 0) {
        clearInterval(interval);
        delete timerIntervals[timer.id];
        timerComplete(timer);
      }
    }, 1000);

    timerIntervals[timer.id] = interval;
  };

  /**
   * Format seconds into MM:SS format
   * @param {number} seconds - Total seconds
   * @returns {string} Formatted time
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Stop a timer
   * @param {string} timerId - Timer ID
   */
  const stopTimer = (timerId) => {
    // Clear interval
    if (timerIntervals[timerId]) {
      clearInterval(timerIntervals[timerId]);
      delete timerIntervals[timerId];
    }

    // Remove from active timers
    const timer = activeTimers.find(t => t.id === timerId);
    activeTimers = activeTimers.filter(t => t.id !== timerId);

    // Reset the button
    const timersContainer = document.getElementById('cookingTimersContainer');
    const timerBtn = timersContainer.querySelector(`[data-active-timer-id="${timerId}"]`);

    if (timerBtn && timer) {
      resetTimerButton(timerBtn, timer.label);
    }

    Utility.showToast('Timer stopped', 'info');
  };

  /**
   * Reset timer button to original state
   * @param {HTMLElement} timerBtn - Timer button element
   * @param {string} label - Timer label
   */
  const resetTimerButton = (timerBtn, label) => {
    // Remove active classes and ID
    timerBtn.classList.remove('timer-active', 'timer-warning', 'timer-critical', 'timer-complete');
    delete timerBtn.dataset.activeTimerId;

    // Remove all child elements
    while (timerBtn.firstChild) {
      timerBtn.removeChild(timerBtn.firstChild);
    }

    // Restore original content
    const labelSpan = document.createElement('span');
    labelSpan.className = 'timer-label';
    labelSpan.textContent = label;

    const durationSpan = document.createElement('span');
    durationSpan.className = 'timer-duration';
    const duration = parseFloat(timerBtn.dataset.duration);
    const minutes = Math.floor(duration);
    const seconds = Math.round((duration % 1) * 60);
    if (seconds > 0) {
      durationSpan.textContent = `${minutes}m ${seconds}s`;
    } else {
      durationSpan.textContent = `${minutes} min`;
    }

    timerBtn.appendChild(labelSpan);
    timerBtn.appendChild(durationSpan);
  };

  /**
   * Handle timer completion
   * @param {Object} timer - Timer object
   */
  const timerComplete = (timer) => {
    // Remove from active timers
    activeTimers = activeTimers.filter(t => t.id !== timer.id);

    // Find and update the button
    const timersContainer = document.getElementById('cookingTimersContainer');
    const timerBtn = timersContainer.querySelector(`[data-active-timer-id="${timer.id}"]`);

    if (timerBtn) {
      // Show complete state
      timerBtn.classList.remove('timer-warning', 'timer-critical');
      timerBtn.classList.add('timer-complete');

      const displayDiv = timerBtn.querySelector('.timer-countdown-display');
      if (displayDiv) {
        displayDiv.textContent = '00:00';
      }
    }

    // Show notification
    Utility.showToast(`⏰ Timer "${timer.label}" is complete!`, 'success');

    // Play notification sound if available
    try {
      const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZRQ0PVKvi7rdkHAU7k9jy2H0nBSV7yO/glEILElyx6+OmUxEKR5/f8r9vIAU1jtHy1oU2Bhxps+7mnEYODlOp4O67aB4FO5PY8tx+KAYle8jv45JDCw9crejjo1QRCkef3/LAbx8GM4nR8tiENAYbaLLu56FCDQxTqeDvwGseBS2ByO/hlEIKElSv6OSiUREKSJ/f88BwHgY1jtHy1oU1Bhxosu7mnEYODlOp4O67aB4FO5PY8tx+KAYle8jv45JDCw9crejjo1QRCkef3/LAbx8GM4nR8tiENAYbaLLu56FCDQxTqeDvwGseBS2ByO/hlEIKElSv6OSiUREKSJ/f88BwHgY1jtHy1oU1Bhxosu7mnEYODlOp4O67aB4FO5PY8tx+KAYle8jv45JDCw9crejjo1QRCkef3/LAbx8GM4nR8tiENAYbaLLu56FCDQxTqeDvwGseBS2ByO/hlEIKElSv6OSiUREKSJ/f88BwHgY1jtHy1oU1Bhxosu7mnEYODlOp4O67aB4FO5PY8tx+KAYle8jv45JDCw9crejjo1QRCkef3/LAbx8GM4nR8tiENAYbaLLu56FCDQxTqeDvwGseBS2ByO/hlEIKElSv6OSiUREKSJ/f88BwHgY1jtHy1oU1Bhxosu7mnEYODlOp4O67aB4FO5PY8tx+KAYle8jv45JDCw9crejjo1QRCkef3/LAbx8GM4nR8tiENAYbaLLu56FCDQxTqeDvwGseBS2ByO/hlEIKElSv6OSiUREKSJ/f88BwHgY1jtHy1oU1Bhxosu7mnEYODlOp4O67aB4FO5PY8tx+KAYle8jv45JDCw9crejjo1QRCkef3/LAbx8GM4nR8tiENAYbaLLu56FCDQxTqeDvwGseBS2ByO/hlEIKElSv6OSiUREKSJ/f88BwHgY1jtHy1oU1Bhxosu7mnEYODlOp4O67aB4FO5PY8tx+KAYle8jv45JDCw9crejjo1QRCkef3/LAbx8GM4nR8tiENAYbaLLu56FCDQxTqeDvwGseBS2ByO/hlEIKElSv6OSiUREKSJ/f88BwHgY=');
      audio.play().catch(e => console.log('Could not play notification sound:', e));
    } catch (e) {
      console.log('Audio notification not available:', e);
    }

    // Reset button after 3 seconds
    setTimeout(() => {
      if (timerBtn) {
        resetTimerButton(timerBtn, timer.label);
      }
    }, 3000);
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
    timerDiv.className = 'active-timer';
