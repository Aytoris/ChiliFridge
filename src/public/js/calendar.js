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
    document.getElementById('exportMealPlanImageBtn').addEventListener('click', exportMealPlanAsImage);
    document.getElementById('clearCalendarButton').addEventListener('click', clearCalendar);
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
  };

  /**
   * Apply protein color to meal selector
   * @param {HTMLElement} selectElement - The select element
   * @param {string|array} protein - Protein type(s) from recipe
   */
  const applyProteinSelectorStyling = (selectElement, protein) => {
    selectElement.classList.remove('has-protein');
    selectElement.style.borderLeft = '';
    selectElement.style.borderImage = '';
    selectElement.style.borderImageSlice = '';
    selectElement.style.background = '';

    if (!protein) return;

    selectElement.classList.add('has-protein');

    // Handle array of proteins (multi-protein)
    if (Array.isArray(protein)) {
      if (protein.length === 0) return;

      // Create striped background for the select element
      const stripeWidth = 100 / protein.length;
      const stripes = protein.map((p, index) => {
        const color = getProteinColor(p, false);
        const start = index * stripeWidth;
        const end = (index + 1) * stripeWidth;
        return `${color} ${start}%, ${color} ${end}%`;
      }).join(', ');

      selectElement.style.background = `linear-gradient(90deg, ${stripes})`;
      selectElement.style.borderLeft = '6px solid rgba(0,0,0,0.2)';
    } else {
      // Single protein string - solid background
      const color = getProteinColor(protein, false);
      selectElement.style.background = color;
      selectElement.style.borderLeft = '6px solid rgba(0,0,0,0.2)';
    }
  };

  /**
   * Apply protein styling to the protein indicator bar
   */
  /**
   * Apply protein color to meal display button
   */
  const applyProteinToMealDisplay = (mealDisplay, protein) => {
    mealDisplay.style.background = '';

    if (!protein) {
      mealDisplay.style.background = 'white';
      return;
    }

    // Handle array of proteins (multi-protein)
    if (Array.isArray(protein)) {
      if (protein.length === 0) {
        mealDisplay.style.background = 'white';
        return;
      }

      // Create horizontal striped background
      const stripeWidth = 100 / protein.length;
      const stripes = protein.map((p, index) => {
        const color = getProteinColor(p, false);
        const start = index * stripeWidth;
        const end = (index + 1) * stripeWidth;
        return `${color} ${start}%, ${color} ${end}%`;
      }).join(', ');

      mealDisplay.style.background = `linear-gradient(90deg, ${stripes})`;
    } else {
      // Single protein string - solid background
      const color = getProteinColor(protein, false);
      mealDisplay.style.background = color;
    }
  };

  /**
   * Open recipe selection modal
   */
  const openRecipeSelectionModal = (dayIndex, mealIndex) => {
    // Create modal if it doesn't exist
    let modal = document.getElementById('recipeSelectionModal');
    if (!modal) {
      modal = createRecipeSelectionModal();
      document.body.appendChild(modal);
    }

    // Get current selection
    const currentRecipe = calendarData[dayIndex]?.[mealIndex]?.recipe || '';

    // Setup filter button click handler
    const filterBtn = modal.querySelector('.recipe-selection-filter-btn');
    const newFilterBtn = filterBtn.cloneNode(true); // Remove old listeners
    filterBtn.parentNode.replaceChild(newFilterBtn, filterBtn);

    newFilterBtn.addEventListener('click', () => {
      const currentFilter = newFilterBtn.getAttribute('data-filter');
      // Cycle through filter modes: all → 15 → 30 → 60
      let newFilter, newIcon, newTitle;

      if (currentFilter === 'all') {
        newFilter = '15';
        newIcon = '15';
        newTitle = '≤15 min';
      } else if (currentFilter === '15') {
        newFilter = '30';
        newIcon = '30';
        newTitle = '≤30 min';
      } else if (currentFilter === '30') {
        newFilter = '60';
        newIcon = '60';
        newTitle = '>30 min';
      } else {
        newFilter = 'all';
        newIcon = '∞';
        newTitle = 'All recipes';
      }

      newFilterBtn.setAttribute('data-filter', newFilter);
      newFilterBtn.innerHTML = newIcon;
      newFilterBtn.title = newTitle;

      populateRecipeList(modal, dayIndex, mealIndex, currentRecipe);
    });

    // Setup sort button click handler
    const sortBtn = modal.querySelector('.recipe-selection-sort-btn');
    const newSortBtn = sortBtn.cloneNode(true); // Remove old listeners
    sortBtn.parentNode.replaceChild(newSortBtn, sortBtn);

    newSortBtn.addEventListener('click', () => {
      const currentSort = newSortBtn.getAttribute('data-sort');
      if (currentSort === 'name') {
        newSortBtn.setAttribute('data-sort', 'protein');
        newSortBtn.innerHTML = '🥗';
        newSortBtn.title = 'Sort by protein';
      } else {
        newSortBtn.setAttribute('data-sort', 'name');
        newSortBtn.innerHTML = '🔤';
        newSortBtn.title = 'Sort by name';
      }
      populateRecipeList(modal, dayIndex, mealIndex, currentRecipe);
    });

    // Populate the list
    populateRecipeList(modal, dayIndex, mealIndex, currentRecipe);

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  };

  /**
   * Populate recipe list in modal with current sort order and filter
   */
  const populateRecipeList = (modal, dayIndex, mealIndex, currentRecipe) => {
    const recipeList = modal.querySelector('.recipe-selection-list');
    const sortBtn = modal.querySelector('.recipe-selection-sort-btn');
    const filterBtn = modal.querySelector('.recipe-selection-filter-btn');
    const sortBy = sortBtn.getAttribute('data-sort');
    const filterBy = filterBtn.getAttribute('data-filter');

    recipeList.innerHTML = '';

    // Add "Clear selection" option
    const clearItem = document.createElement('div');
    clearItem.className = 'recipe-selection-item';
    if (!currentRecipe) {
      clearItem.classList.add('selected');
    }

    const clearColor = document.createElement('div');
    clearColor.className = 'recipe-selection-color';
    clearColor.style.background = '#f0f0f0';
    clearColor.style.border = '2px dashed #ccc';

    const clearName = document.createElement('div');
    clearName.className = 'recipe-selection-name';
    clearName.textContent = 'Clear selection';
    clearName.style.fontStyle = 'italic';
    clearName.style.color = '#999';

    clearItem.appendChild(clearColor);
    clearItem.appendChild(clearName);
    clearItem.addEventListener('click', () => {
      selectRecipeFromModal(dayIndex, mealIndex, '');
      closeRecipeSelectionModal();
    });

    recipeList.appendChild(clearItem);

    // Add all recipes with filtering and sorting
    const recipes = MealModule.getAllRecipes();
    if (recipes && Object.keys(recipes).length > 0) {
      let recipeKeys = Object.keys(recipes);

      // Filter by cooking time
      if (filterBy !== 'all') {
        recipeKeys = recipeKeys.filter(recipeName => {
          const cookingTime = recipes[recipeName]?.cookingTime || 0;

          if (filterBy === '15') {
            return cookingTime <= 15;
          } else if (filterBy === '30') {
            return cookingTime <= 30;
          } else if (filterBy === '60') {
            return cookingTime > 30;
          }
          return true;
        });
      }

      // Sort based on current sort mode
      if (sortBy === 'protein') {
        recipeKeys.sort((a, b) => {
          const proteinA = recipes[a]?.protein;
          const proteinB = recipes[b]?.protein;

          // Get first protein for sorting
          const getFirstProtein = (p) => {
            if (!p) return 'zzz'; // Put 'none' at end
            if (Array.isArray(p)) return p[0] || 'zzz';
            return p;
          };

          const pA = getFirstProtein(proteinA);
          const pB = getFirstProtein(proteinB);

          // Sort by protein, then by name
          if (pA === pB) return a.localeCompare(b);
          return pA.localeCompare(pB);
        });
      } else {
        // Sort alphabetically by name
        recipeKeys.sort();
      }

      recipeKeys.forEach(recipeName => {
        const item = document.createElement('div');
        item.className = 'recipe-selection-item';
        if (recipeName === currentRecipe) {
          item.classList.add('selected');
        }

        // Create color indicator
        const colorIndicator = document.createElement('div');
        colorIndicator.className = 'recipe-selection-color';

        if (recipes[recipeName] && recipes[recipeName].protein) {
          const protein = recipes[recipeName].protein;

          if (Array.isArray(protein) && protein.length > 0) {
            // Multi-protein: create striped background
            const stripeHeight = 100 / protein.length;
            const stripes = protein.map((p, index) => {
              const color = getProteinColor(p, false);
              const start = index * stripeHeight;
              const end = (index + 1) * stripeHeight;
              return `${color} ${start}%, ${color} ${end}%`;
            }).join(', ');
            colorIndicator.style.background = `linear-gradient(180deg, ${stripes})`;
          } else if (!Array.isArray(protein)) {
            // Single protein: solid color
            const color = getProteinColor(protein, false);
            colorIndicator.style.background = color;
          }
        } else {
          // No protein info
          colorIndicator.style.background = '#e0e0e0';
        }

        const name = document.createElement('div');
        name.className = 'recipe-selection-name';
        name.textContent = recipeName;

        item.appendChild(colorIndicator);
        item.appendChild(name);

        item.addEventListener('click', () => {
          selectRecipeFromModal(dayIndex, mealIndex, recipeName);
          closeRecipeSelectionModal();
        });

        recipeList.appendChild(item);
      });
    }
  };

  /**
   * Create recipe selection modal element
   */
  const createRecipeSelectionModal = () => {
    const modal = document.createElement('div');
    modal.id = 'recipeSelectionModal';
    modal.className = 'recipe-selection-modal';

    const content = document.createElement('div');
    content.className = 'recipe-selection-content';

    const header = document.createElement('div');
    header.className = 'recipe-selection-header';

    const title = document.createElement('div');
    title.className = 'recipe-selection-title';
    title.textContent = 'Select a Recipe';

    const headerButtons = document.createElement('div');
    headerButtons.className = 'recipe-selection-header-buttons';

    const filterBtn = document.createElement('button');
    filterBtn.className = 'recipe-selection-filter-btn';
    filterBtn.innerHTML = '∞'; // Default: all recipes
    filterBtn.title = 'All recipes';
    filterBtn.setAttribute('data-filter', 'all');

    const sortBtn = document.createElement('button');
    sortBtn.className = 'recipe-selection-sort-btn';
    sortBtn.innerHTML = '🔤'; // Default: alphabetical
    sortBtn.title = 'Sort by name';
    sortBtn.setAttribute('data-sort', 'name');

    const closeBtn = document.createElement('button');
    closeBtn.className = 'recipe-selection-close';
    closeBtn.innerHTML = '×';
    closeBtn.addEventListener('click', closeRecipeSelectionModal);

    headerButtons.appendChild(filterBtn);
    headerButtons.appendChild(sortBtn);
    headerButtons.appendChild(closeBtn);

    header.appendChild(title);
    header.appendChild(headerButtons);

    const list = document.createElement('div');
    list.className = 'recipe-selection-list';

    content.appendChild(header);
    content.appendChild(list);
    modal.appendChild(content);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeRecipeSelectionModal();
      }
    });

    return modal;
  };

  /**
   * Close recipe selection modal
   */
  const closeRecipeSelectionModal = () => {
    const modal = document.getElementById('recipeSelectionModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scroll
    }
  };

  // Add keyboard handler for ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeRecipeSelectionModal();
    }
  });

  /**
   * Select a recipe from the modal
   */
  const selectRecipeFromModal = (dayIndex, mealIndex, recipeName) => {
    updateMealSelection(dayIndex, mealIndex, recipeName);
  };

  /**
   * Display the calendar with days of the week
   */
  const displayCalendar = () => {
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

    // Create a card for each day - display starting from current day
    for (let i = 0; i < 7; i++) {
      // Calculate which day of week to show (rotating from current day)
      const dayIndex = (currentDay + i) % 7;

      const dayCard = document.createElement('div');
      dayCard.className = 'day-card';
      dayCard.id = `day-${i}`;

      // Mark the current day (first card shown)
      if (i === 0) {
        dayCard.classList.add('current-day');
      }

      // Add day name - use rotated day index
      const dayNameDiv = document.createElement('div');
      dayNameDiv.className = 'day-name';
      dayNameDiv.textContent = daysOfWeek[dayIndex];
      dayCard.appendChild(dayNameDiv);

      // Create a wrapper for meals to ensure Sortable indices match data indices
      const mealsList = document.createElement('div');
      mealsList.className = 'meals-list';
      mealsList.id = `meals-list-day-${dayIndex}`;

      // Create meal containers for each meal slot (without specific meal types)
      for (let mealIndex = 0; mealIndex < MEAL_COUNT; mealIndex++) {
        const mealContainer = document.createElement('div');
        mealContainer.className = 'meal-container';

        // Create meal display button
        const mealDisplay = document.createElement('button');
        mealDisplay.className = 'meal-display';
        mealDisplay.id = `meal-display-day-${dayIndex}-${mealIndex}`;
        mealDisplay.setAttribute('data-day', dayIndex);
        mealDisplay.setAttribute('data-meal', mealIndex);

        // Set initial text - use dayIndex to access correct data position
        const selectedRecipe = calendarData[dayIndex]?.[mealIndex]?.recipe;
        if (selectedRecipe) {
          mealDisplay.textContent = selectedRecipe;
          mealContainer.classList.add('meal-active');

          // Apply protein styling
          const recipes = MealModule.getAllRecipes();
          if (recipes && recipes[selectedRecipe] && recipes[selectedRecipe].protein) {
            applyProteinStyling(mealContainer, recipes[selectedRecipe].protein, true);
            applyProteinToMealDisplay(mealDisplay, recipes[selectedRecipe].protein);
          }
        } else {
          mealDisplay.textContent = 'Select meal...';
          mealDisplay.classList.add('empty');
        }

        // Open modal on click - use dayIndex for data position
        mealDisplay.addEventListener('click', () => {
          openRecipeSelectionModal(dayIndex, mealIndex);
        });

        mealContainer.appendChild(mealDisplay);

        // Add people count selector
        const peopleContainer = document.createElement('div');
        peopleContainer.style.display = 'flex';
        peopleContainer.style.alignItems = 'center';
        peopleContainer.style.marginTop = '5px';

        const peopleLabel = document.createElement('label');
        peopleLabel.textContent = 'People: ';
        peopleLabel.setAttribute('for', `people-day-${dayIndex}-${mealIndex}`);
        peopleContainer.appendChild(peopleLabel);

        const peopleSelect = document.createElement('select');
        peopleSelect.className = 'people-selector';
        peopleSelect.id = `people-day-${dayIndex}-${mealIndex}`;
        peopleSelect.setAttribute('data-day', dayIndex);
        peopleSelect.setAttribute('data-meal', mealIndex);
        peopleSelect.addEventListener('change', (e) => updatePeopleCount(dayIndex, mealIndex, parseInt(e.target.value, 10)));

        // Add options for people count
        for (let p = 1; p <= 8; p++) {
          const option = document.createElement('option');
          option.value = p;
          option.textContent = p;
          peopleSelect.appendChild(option);
        }

        // Set the selected value if there's saved data - use dayIndex
        if (calendarData[dayIndex] && calendarData[dayIndex][mealIndex]) {
          peopleSelect.value = calendarData[dayIndex][mealIndex].peopleCount || 2;
        }

        peopleContainer.appendChild(peopleSelect);
        mealContainer.appendChild(peopleContainer);

        // Add "Cook This" button if a recipe is selected - use dayIndex
        if (calendarData[dayIndex] && calendarData[dayIndex][mealIndex] && calendarData[dayIndex][mealIndex].recipe) {
          const cookButton = document.createElement('button');
          cookButton.className = 'cook-button';
          cookButton.textContent = 'Cook This';
          cookButton.setAttribute('data-day', dayIndex);
          cookButton.setAttribute('data-meal', mealIndex);
          cookButton.setAttribute('data-recipe', calendarData[dayIndex][mealIndex].recipe);

          // Make sure we're using the correct people count from the meal planner
          const mealPeopleCount = calendarData[dayIndex][mealIndex].peopleCount || 2;
          cookButton.setAttribute('data-people', mealPeopleCount);

          // Use a direct function reference instead of an arrow function
          cookButton.onclick = function () {
            const recipe = this.getAttribute('data-recipe');
            const people = parseInt(this.getAttribute('data-people'), 10);
            console.log(`Cook button clicked for ${recipe} for ${people} people`);
            openCookingMode(recipe, people);
          };

          peopleContainer.appendChild(cookButton);
        }

        mealsList.appendChild(mealContainer);
      }

      dayCard.appendChild(mealsList);
      calendarEl.appendChild(dayCard);

      // Initialize Sortable for this day's meal list
      new Sortable(mealsList, {
        group: 'shared', // Allow dragging between days
        animation: 150,
        draggable: '.meal-container',
        delay: 100, // Slight delay to prevent accidental drags on touch
        delayOnTouchOnly: true,
        onEnd: handleDragEnd
      });
    }

    // Scroll to current day after rendering
    scrollToCurrentDay();
  };

  /**
   * Handle drag and drop end event
   * @param {Object} evt - Sortable event object
   */
  const handleDragEnd = (evt) => {
    const itemEl = evt.item;  // dragged HTMLElement
    const toEl = evt.to;    // target list
    const fromEl = evt.from;  // previous list

    // If dropped outside or in same position, do nothing
    if (!toEl || (toEl === fromEl && evt.newIndex === evt.oldIndex)) {
      return;
    }

    // Get indices
    // Note: The DOM has already been changed by Sortable.
    // We need to map the DOM elements back to their data indices.

    // Parse day indices from the container IDs (meals-list-day-X)
    const fromDayIndex = parseInt(fromEl.id.replace('meals-list-day-', ''), 10);
    const toDayIndex = parseInt(toEl.id.replace('meals-list-day-', ''), 10);

    const fromMealIndex = evt.oldIndex;
    let toMealIndex = evt.newIndex;

    // Clamp target index to valid range
    // When dragging to the end of a list, Sortable gives an index equal to length (e.g., 3)
    // We want to swap with the last item in that case.
    if (toMealIndex >= MEAL_COUNT) {
      toMealIndex = MEAL_COUNT - 1;
    }

    // We want to SWAP the meals, but Sortable has performed an INSERT.
    // So we need to:
    // 1. Revert the DOM change (by re-rendering)
    // 2. Perform the data swap
    // 3. Re-render with new data

    // Perform the data swap
    swapMeals(fromDayIndex, fromMealIndex, toDayIndex, toMealIndex);

    // Re-render to show the swapped state and fix DOM
    displayCalendar();
  };

  /**
   * Swap two meals in the calendar data
   */
  const swapMeals = (day1, slot1, day2, slot2) => {
    // Ensure data exists
    if (!calendarData[day1]) calendarData[day1] = [];
    if (!calendarData[day2]) calendarData[day2] = [];

    // Ensure slots exist (fill with empty if needed)
    while (calendarData[day1].length <= slot1) {
      calendarData[day1].push({ recipe: '', peopleCount: 2 });
    }
    while (calendarData[day2].length <= slot2) {
      calendarData[day2].push({ recipe: '', peopleCount: 2 });
    }

    // Swap
    const temp = calendarData[day1][slot1];
    calendarData[day1][slot1] = calendarData[day2][slot2];
    calendarData[day2][slot2] = temp;

    // Save
    saveCalendarData();

    Utility.showToast('Meals swapped!', 'success');
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

    // Update the visual display
    const mealDisplay = document.getElementById(`meal-display-day-${dayIndex}-${mealIndex}`);
    const mealContainer = mealDisplay.closest('.meal-container');

    if (recipeName) {
      mealDisplay.textContent = recipeName;
      mealDisplay.classList.remove('empty');
      mealContainer.classList.add('meal-active');

      // Get the protein type from the recipe and apply styling
      const recipes = MealModule.getAllRecipes();
      if (recipes[recipeName] && recipes[recipeName].protein) {
        applyProteinStyling(mealContainer, recipes[recipeName].protein, true);
        applyProteinToMealDisplay(mealDisplay, recipes[recipeName].protein);
      }
    } else {
      mealDisplay.textContent = 'Select meal...';
      mealDisplay.classList.add('empty');
      mealContainer.classList.remove('meal-active');
      applyProteinStyling(mealContainer, null, false);
      applyProteinToMealDisplay(mealDisplay, null);
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
      cookButton.onclick = function () {
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

        // Sanitize data: ensure 7 days and max MEAL_COUNT meals per day
        if (Array.isArray(calendarData)) {
          // Ensure 7 days
          while (calendarData.length < 7) {
            calendarData.push([]);
          }
          if (calendarData.length > 7) {
            calendarData = calendarData.slice(0, 7);
          }

          // Ensure MEAL_COUNT meals per day
          calendarData.forEach((dayMeals, index) => {
            if (!Array.isArray(dayMeals)) {
              calendarData[index] = [];
            }
            // Trim extra meals
            if (calendarData[index].length > MEAL_COUNT) {
              calendarData[index] = calendarData[index].slice(0, MEAL_COUNT);
            }
            // Fill missing meals
            while (calendarData[index].length < MEAL_COUNT) {
              calendarData[index].push({ recipe: '', peopleCount: 2 });
            }
          });
        }

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
      // Check if this ingredient is in the always-have list
      let isAlwaysHave = false;
      try {
        if (AlwaysHaveModule && typeof AlwaysHaveModule.isAlwaysHave === 'function') {
          isAlwaysHave = AlwaysHaveModule.isAlwaysHave(ingredient.name);
        }
      } catch (error) {
        // AlwaysHaveModule not yet loaded
      }

      // Skip always-have items - they're considered always available
      if (isAlwaysHave) {
        return;
      }

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
   * Export the meal plan calendar as an image
   */
  const exportMealPlanAsImage = async () => {
    try {
      // Get the calendar container element
      const calendarElement = document.getElementById('calendar');

      if (!calendarElement) {
        Utility.showToast('Calendar not found!', 'error');
        return;
      }

      // Show a loading toast
      Utility.showToast('Generating meal plan image...', 'info');

      // Save original styles
      const originalOverflow = calendarElement.style.overflow;
      const originalMaxWidth = calendarElement.style.maxWidth;
      const originalHeight = calendarElement.style.height;
      const originalScrollLeft = calendarElement.scrollLeft;

      // Temporarily modify styles to show all content
      calendarElement.style.overflow = 'visible';
      calendarElement.style.maxWidth = 'none';
      calendarElement.style.height = 'auto';
      calendarElement.scrollLeft = 0;

      // Wait a bit for the layout to adjust
      await new Promise(resolve => setTimeout(resolve, 100));

      // Use html2canvas to capture the calendar
      const canvas = await html2canvas(calendarElement, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality image
        logging: false,
        useCORS: true,
        scrollX: 0,
        scrollY: -window.scrollY, // Account for page scroll
        width: calendarElement.scrollWidth,
        height: calendarElement.scrollHeight
      });

      // Restore original styles
      calendarElement.style.overflow = originalOverflow;
      calendarElement.style.maxWidth = originalMaxWidth;
      calendarElement.style.height = originalHeight;
      calendarElement.scrollLeft = originalScrollLeft;

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        // Create a download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        // Generate filename with current date
        const now = new Date();
        const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD format
        link.download = `meal-plan-${dateStr}.png`;

        link.href = url;
        link.click();

        // Clean up
        URL.revokeObjectURL(url);

        Utility.showToast('Meal plan image downloaded!', 'success');
      }, 'image/png');

    } catch (error) {
      console.error('Error exporting meal plan:', error);
      Utility.showToast('Failed to export meal plan image', 'error');
    }
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

      // Create 7 days with empty meals in static positions (Sun=0, Mon=1, etc.)
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
    };

    document.getElementById('closeCookingMode').onclick = closeModal;
    document.getElementById('closeCookingModeFromOverlay').onclick = closeModal;

    // Don't close on outside click for cooking mode (it's fullscreen)
    // User must use the X button to close

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

    // Initial sort
    sortTimers();
  };

  /**
   * Sort timers: Active first (by remaining time), then Inactive (by duration)
   */
  const sortTimers = () => {
    const timersContainer = document.getElementById('cookingTimersContainer');
    if (!timersContainer) return;

    const buttons = Array.from(timersContainer.querySelectorAll('.timer-button'));

    buttons.sort((a, b) => {
      const aActive = a.classList.contains('timer-active');
      const bActive = b.classList.contains('timer-active');

      // 1. Active timers come first
      if (aActive && !bActive) return -1;
      if (!aActive && bActive) return 1;

      // 2. Sort active timers by remaining time (ascending)
      if (aActive && bActive) {
        // We need to find the remaining time for these timers
        // The button has data-active-timer-id
        const aId = a.dataset.activeTimerId;
        const bId = b.dataset.activeTimerId;

        const aTimer = activeTimers.find(t => t.id === aId);
        const bTimer = activeTimers.find(t => t.id === bId);

        const aTime = aTimer ? aTimer.remainingSeconds : Infinity;
        const bTime = bTimer ? bTimer.remainingSeconds : Infinity;

        return aTime - bTime;
      }

      // 3. Sort inactive timers by duration (ascending)
      const aDuration = parseFloat(a.dataset.duration);
      const bDuration = parseFloat(b.dataset.duration);

      return aDuration - bDuration;
    });

    // Re-append in new order
    buttons.forEach(btn => timersContainer.appendChild(btn));
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
    // Allow duplicate timers - removed check

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
    sortTimers(); // Sort to move active timer to front

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

    // Clear existing content
    timerBtn.innerHTML = '';

    // Create countdown display only
    const displayDiv = document.createElement('div');
    displayDiv.className = 'timer-countdown-display';
    displayDiv.id = `${timer.id}-display`;
    displayDiv.textContent = formatTime(timer.remainingSeconds);

    // Add countdown to button
    timerBtn.appendChild(displayDiv);

    // Make entire button clickable to stop
    timerBtn.onclick = (e) => {
      e.stopPropagation();
      stopTimer(timer.id);
    };
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

      if (displayDiv) {
        displayDiv.textContent = formatTime(remainingSeconds);
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

    sortTimers(); // Sort to move stopped timer back to inactive list

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

    // Remove onclick handler set by transformTimerButton
    timerBtn.onclick = null;

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

    // Restore click handler to start the timer again
    timerBtn.addEventListener('click', () => {
      startTimer(label, duration);
    });
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
    exportMealPlanAsImage,
    clearCalendar,
    getCalendarData: () => calendarData,
    openCookingMode
  };
})();
