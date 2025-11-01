/**
 * Fridge module for managing fridge functionality
 */
const FridgeModule = (() => {
  // State
  let fridge = {};
  let isUnitG = false;
  // New state for categories
  let fridgeCategories = [];
  let isShowingCategories = true;

  /**
   * Initialize the fridge module
   */
  const init = async () => {
    // First load categories before loading the fridge
    loadFridgeCategories();

    // Then load fridge data
    await loadFridge();

    // Make sure all elements are properly initialized
    populateIngredientList();
    populateCategorySelect();

    // Update the toggle button text to match the initial state
    const toggleBtn = document.getElementById('toggleFridgeCategoriesBtn');
    if (toggleBtn) {
      toggleBtn.textContent = isShowingCategories ? 'Hide Categories' : 'Show Categories';
    }

    // Set up event listeners
    setupEventListeners();

    // Log initialization
    console.log('Fridge module initialized with categories');
  };

  /**
   * Load fridge categories from localStorage or use defaults
   */
  const loadFridgeCategories = () => {
    try {
      const savedCategories = localStorage.getItem('fridgeCategories');
      if (savedCategories) {
        fridgeCategories = JSON.parse(savedCategories);
      } else {
        // Use default categories if nothing is saved
        fridgeCategories = [
          { id: 'refrigerator', name: 'Refrigerator', order: 0 },
          { id: 'freezer', name: 'Freezer', order: 1 },
          { id: 'pantry', name: 'Pantry', order: 2 },
          { id: 'spices', name: 'Spices & Herbs', order: 3 },
          { id: 'fruits', name: 'Fruits & Vegetables', order: 4 },
          { id: 'drinks', name: 'Drinks & Beverages', order: 5 },
          { id: 'other', name: 'Other Items', order: 6 }
        ];
        saveFridgeCategories();
      }
    } catch (error) {
      console.error('Error loading fridge categories:', error);
      // Fallback to defaults
      fridgeCategories = [
        { id: 'refrigerator', name: 'Refrigerator', order: 0 },
        { id: 'freezer', name: 'Freezer', order: 1 },
        { id: 'pantry', name: 'Pantry', order: 2 },
        { id: 'other', name: 'Other Items', order: 3 }
      ];
      saveFridgeCategories();
    }
  };

  /**
   * Save fridge categories to localStorage
   */
  const saveFridgeCategories = () => {
    try {
      localStorage.setItem('fridgeCategories', JSON.stringify(fridgeCategories));
    } catch (error) {
      console.error('Error saving fridge categories:', error);
    }
  };

  /**
   * Load fridge data from the server
   */
  const loadFridge = async () => {
    try {
      fridge = await API.fetchFridge();

      // Ensure all items have categories assigned
      ensureFridgeItemCategories();

      displayFridge();
    } catch (error) {
      console.error('Failed to load fridge:', error);
    }
  };

  /**
   * Ensure all fridge items have categories assigned
   */
  const ensureFridgeItemCategories = () => {
    Object.keys(fridge).forEach(key => {
      const item = fridge[key];
      if (!item.category) {
        // Assign a category if one doesn't exist
        item.category = determineFridgeCategory(item.name);
      }
    });
  };

  /**
   * Populate the ingredient datalist with all available ingredients
   */
  const populateIngredientList = () => {
    try {
      const ingredients = new Set();

      // Add existing fridge ingredients first (these don't require MealModule)
      Object.values(fridge).forEach(item => {
        if (item && item.name) {
          ingredients.add(item.name);
        }
      });

      // Try to get recipes if available
      try {
        const recipes = MealModule.getAllRecipes();
        if (recipes && typeof recipes === 'object') {
          // Get all unique ingredients from recipes
          Object.values(recipes).forEach(recipe => {
            if (Array.isArray(recipe)) {
              recipe.forEach(ingredient => {
                if (ingredient && ingredient.name) {
                  ingredients.add(ingredient.name);
                }
              });
            }
          });
        }
      } catch (recipeError) {
        console.log('Recipes not yet available for ingredients list');
        // It's okay if recipes aren't available yet, we'll use what we have
      }

      // Convert to sorted array
      const sortedIngredients = Array.from(ingredients).sort();

      // Populate datalist
      const datalist = document.getElementById('ingredientList');
      if (datalist) {
        datalist.innerHTML = '';

        sortedIngredients.forEach(ingredient => {
          const option = document.createElement('option');
          option.value = ingredient;
          datalist.appendChild(option);
        });
      }

      // Listen for recipe data loaded event to update the list
      window.addEventListener('recipeDataLoaded', populateIngredientList, { once: true });
    } catch (error) {
      console.error('Failed to populate ingredient list:', error);
    }
  };

  /**
   * Set up event listeners for fridge functionality
   */
  const setupEventListeners = () => {
    document.getElementById('addFoodBtn').addEventListener('click', () => {
      addFood();
      if (MealModule && typeof MealModule.findMissingIngredients === 'function') {
        MealModule.findMissingIngredients();
      }
    });

    document.getElementById('clearFridgeBtn').addEventListener('click', clearFridge);
    document.getElementById('toggleUnitBtn').addEventListener('click', toggleUnit);

    // Add category toggle button listener
    document.getElementById('toggleFridgeCategoriesBtn')?.addEventListener('click', toggleCategories);

    // Add edit categories button listener
    document.getElementById('editFridgeCategoriesBtn')?.addEventListener('click', showFridgeCategoriesModal);

    // Add auto-complete functionality to ingredient input
    const ingredientInput = document.getElementById('ingredientInput');
    if (ingredientInput) {
      ingredientInput.addEventListener('input', handleIngredientInput);
      // Also add keyup event for better responsiveness
      ingredientInput.addEventListener('keyup', handleIngredientInput);
      // Add change event for when user selects from datalist
      ingredientInput.addEventListener('change', handleIngredientInput);

      // Add keyboard navigation for dropdown
      ingredientInput.addEventListener('keydown', handleDropdownKeyboard);

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('autocompleteDropdown');
        if (dropdown && !ingredientInput.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove('show');
        }
      });

      // Close dropdown on blur
      ingredientInput.addEventListener('blur', () => {
        // Small delay to allow click events on dropdown items to fire first
        setTimeout(() => {
          const dropdown = document.getElementById('autocompleteDropdown');
          if (dropdown) {
            dropdown.classList.remove('show');
          }
        }, 200);
      });
    }

    // Add validation to quantity input to only allow digits
    const quantityInput = document.getElementById('quantityInput');
    quantityInput.addEventListener('keypress', (e) => {
      // Allow only digits and control keys (backspace, delete, arrows, etc.)
      if (!/^\d$/.test(e.key) && e.key !== '.') {
        e.preventDefault();
      }

      // Prevent multiple decimal points
      if (e.key === '.' && quantityInput.value.includes('.')) {
        e.preventDefault();
      }
    });

    // Populate the ingredient category select
    populateCategorySelect();
  };

  /**
   * Handle input in the ingredient field for auto-completion
   */
  const handleIngredientInput = (e) => {
    const input = e.target;
    const inputValue = input.value.trim();
    const dropdown = document.getElementById('autocompleteDropdown');

    // Hide dropdown if input is empty
    if (inputValue.length < 1) {
      dropdown.classList.remove('show');
      return;
    }

    // Get all ingredients from recipes
    const ingredients = new Set();

    // Add existing fridge ingredients
    Object.values(fridge).forEach(item => {
      if (item && item.name) {
        ingredients.add(item.name);
      }
    });

    // Add recipe ingredients if MealModule is available
    try {
      if (MealModule && typeof MealModule.getAllRecipes === 'function') {
        const recipes = MealModule.getAllRecipes();

        if (recipes && typeof recipes === 'object') {
          Object.values(recipes).forEach(recipe => {
            // Check if recipe has ingredients property
            if (recipe && recipe.ingredients && Array.isArray(recipe.ingredients)) {
              recipe.ingredients.forEach(ingredient => {
                if (ingredient && ingredient.name) {
                  ingredients.add(ingredient.name);
                }
              });
            }
          });
        }
      }
    } catch (error) {
      // Recipe module not yet loaded, will update later
    }

    // Convert to array for filtering
    const allIngredients = Array.from(ingredients);

    // Find matching ingredients (case-insensitive search)
    // First try to find ingredients that start with the input (more precise)
    const startsWithMatches = allIngredients
      .filter(name => name.toLowerCase().startsWith(inputValue.toLowerCase()))
      .sort();

    // If no starts-with matches, look for ingredients that contain the input
    const matchingIngredients = startsWithMatches.length > 0
      ? startsWithMatches
      : allIngredients
          .filter(name => name.toLowerCase().includes(inputValue.toLowerCase()))
          .sort();

    // Show dropdown with matching options
    showAutocompleteDropdown(dropdown, matchingIngredients, input);

    // If exactly one match, auto-complete and set unit and category
    if (matchingIngredients.length === 1) {
      const matchedIngredient = matchingIngredients[0];

      // Only autocomplete if the input is not already the complete match
      if (input.value !== matchedIngredient) {
        input.value = matchedIngredient;
      }

      // Set appropriate unit based on recipe data
      const unit = getUnitForIngredient(matchedIngredient);
      if (unit === 'g' && !isUnitG) {
        toggleUnit(); // Switch to grams if needed
      } else if (unit !== 'g' && isUnitG) {
        toggleUnit(); // Switch to count if needed
      }

      // Check if this ingredient was previously stored in a specific category
      const categorySelect = document.getElementById('ingredientCategorySelect');
      if (categorySelect) {
        // Look for this ingredient in our existing fridge data
        const existingItem = findIngredientPreviousUse(matchedIngredient);
        if (existingItem && existingItem.category) {
          // Use the previously used category
          categorySelect.value = existingItem.category;
        } else {
          // Use the auto-detected category
          const category = determineFridgeCategory(matchedIngredient);
          categorySelect.value = category;
        }
      }

      // Hide dropdown and move focus to quantity input
      dropdown.classList.remove('show');
      setTimeout(() => {
        document.getElementById('quantityInput').focus();
      }, 100);
    }
  };

  /**
   * Show autocomplete dropdown with matching ingredients
   * @param {HTMLElement} dropdown - Dropdown element
   * @param {Array} matches - Array of matching ingredient names
   * @param {HTMLElement} input - Input element
   */
  const showAutocompleteDropdown = (dropdown, matches, input) => {
    // Clear existing items
    dropdown.innerHTML = '';

    // If no matches, hide dropdown
    if (matches.length === 0) {
      dropdown.classList.remove('show');
      return;
    }

    // Limit to max 10 items to avoid overwhelming UI
    const displayMatches = matches.slice(0, 10);

    // Create dropdown items
    displayMatches.forEach((ingredient, index) => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.textContent = ingredient;

      // Highlight first item
      if (index === 0) {
        item.classList.add('highlighted');
      }

      // Use mousedown instead of click to fire before blur event
      item.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevent input from losing focus
        selectIngredient(ingredient, input);
      });

      dropdown.appendChild(item);
    });

    // Show more indicator if there are more matches
    if (matches.length > 10) {
      const moreItem = document.createElement('div');
      moreItem.className = 'autocomplete-no-results';
      moreItem.textContent = `... and ${matches.length - 10} more`;
      dropdown.appendChild(moreItem);
    }

    // Show dropdown
    dropdown.classList.add('show');
  };

  /**
   * Select an ingredient from the dropdown
   * @param {string} ingredient - Selected ingredient name
   * @param {HTMLElement} input - Input element
   */
  const selectIngredient = (ingredient, input) => {
    const dropdown = document.getElementById('autocompleteDropdown');

    // Set input value
    input.value = ingredient;

    // Hide dropdown
    dropdown.classList.remove('show');

    // Set appropriate unit based on recipe data
    const unit = getUnitForIngredient(ingredient);
    if (unit === 'g' && !isUnitG) {
      toggleUnit();
    } else if (unit !== 'g' && isUnitG) {
      toggleUnit();
    }

    // Set category
    const categorySelect = document.getElementById('ingredientCategorySelect');
    if (categorySelect) {
      const existingItem = findIngredientPreviousUse(ingredient);
      if (existingItem && existingItem.category) {
        categorySelect.value = existingItem.category;
      } else {
        const category = determineFridgeCategory(ingredient);
        categorySelect.value = category;
      }
    }

    // Focus quantity input
    document.getElementById('quantityInput').focus();
  };

  /**
   * Handle keyboard navigation in the dropdown
   * @param {KeyboardEvent} e - Keyboard event
   */
  const handleDropdownKeyboard = (e) => {
    const dropdown = document.getElementById('autocompleteDropdown');

    if (!dropdown.classList.contains('show')) {
      return;
    }

    const items = dropdown.querySelectorAll('.autocomplete-item');
    if (items.length === 0) return;

    const highlighted = dropdown.querySelector('.autocomplete-item.highlighted');
    let currentIndex = highlighted ? Array.from(items).indexOf(highlighted) : -1;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        // Remove current highlight
        if (highlighted) highlighted.classList.remove('highlighted');

        // Move to next item
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('highlighted');
        items[currentIndex].scrollIntoView({ block: 'nearest' });
        break;

      case 'ArrowUp':
        e.preventDefault();
        // Remove current highlight
        if (highlighted) highlighted.classList.remove('highlighted');

        // Move to previous item
        currentIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
        items[currentIndex].classList.add('highlighted');
        items[currentIndex].scrollIntoView({ block: 'nearest' });
        break;

      case 'Enter':
        e.preventDefault();
        if (highlighted) {
          const ingredient = highlighted.textContent;
          selectIngredient(ingredient, e.target);
        }
        break;

      case 'Escape':
        e.preventDefault();
        dropdown.classList.remove('show');
        break;
    }
  };

  /**
   * Get the unit typically used for an ingredient from recipes
   * @param {string} ingredientName - Name of the ingredient
   * @returns {string} - Unit ('g' or '')
   */
  const getUnitForIngredient = (ingredientName) => {
    try {
      if (MealModule && typeof MealModule.getAllRecipes === 'function') {
        const recipes = MealModule.getAllRecipes();
        if (recipes && typeof recipes === 'object') {
          for (const recipe of Object.values(recipes)) {
            if (recipe && recipe.ingredients && Array.isArray(recipe.ingredients)) {
              for (const ingredient of recipe.ingredients) {
                if (ingredient && ingredient.name === ingredientName) {
                  return ingredient.unit || '';
                }
              }
            }
          }
        }
      }
    } catch (error) {
      // Recipe module not yet loaded
    }

    return '';
  };

  /**
   * Populate the category select dropdown
   */
  const populateCategorySelect = () => {
    const categorySelect = document.getElementById('ingredientCategorySelect');
    if (!categorySelect) return;

    // Clear existing options
    categorySelect.innerHTML = '';

    // Sort categories by order
    const sortedCategories = [...fridgeCategories].sort((a, b) => a.order - b.order);

    // Add options for each category
    sortedCategories.forEach(category => {
      const option = document.createElement('option');
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  };

  /**
   * Toggle unit display (g vs quantity)
   */
  const toggleUnit = () => {
    isUnitG = !isUnitG;
    document.getElementById('unitDisplay').textContent = isUnitG ? 'g' : '';
  };

  /**
   * Toggle category display
   */
  const toggleCategories = () => {
    isShowingCategories = !isShowingCategories;
    displayFridge();
    const btnText = isShowingCategories ? 'Hide Categories' : 'Show Categories';
    document.getElementById('toggleFridgeCategoriesBtn').textContent = btnText;
  };

  /**
   * Show modal for editing fridge categories
   */
  const showFridgeCategoriesModal = () => {
    const modal = document.getElementById('fridgeCategoriesModal');
    const modalList = document.getElementById('fridgeCategoriesModalList');

    // Store the current fridge data to prevent loss
    const currentFridge = JSON.parse(JSON.stringify(fridge));

    // Clear existing items
    modalList.innerHTML = '';

    // Add category items to modal
    fridgeCategories.forEach(category => {
      const item = document.createElement('div');
      item.className = 'sortable-item';
      item.setAttribute('data-id', category.id);
      item.innerHTML = `
        <span class="handle">⋮⋮</span>
        <span class="category-name">${category.name}</span>
        <input type="text" class="category-name-edit" value="${category.name}">
        <button class="edit-category-btn">✏️</button>
        <button class="save-category-btn" style="display:none">💾</button>
      `;
      modalList.appendChild(item);

      // Add edit button listener
      item.querySelector('.edit-category-btn').addEventListener('click', (e) => {
        const itemEl = e.target.closest('.sortable-item');
        itemEl.classList.add('editing');
        itemEl.querySelector('.category-name').style.display = 'none';
        itemEl.querySelector('.category-name-edit').style.display = 'inline-block';
        itemEl.querySelector('.edit-category-btn').style.display = 'none';
        itemEl.querySelector('.save-category-btn').style.display = 'inline-block';
      });

      // Add save button listener
      item.querySelector('.save-category-btn').addEventListener('click', (e) => {
        const itemEl = e.target.closest('.sortable-item');
        const newName = itemEl.querySelector('.category-name-edit').value.trim();

        if (newName) {
          // Update the display and data
          itemEl.querySelector('.category-name').textContent = newName;

          // Find and update the category
          const categoryId = itemEl.getAttribute('data-id');
          const categoryIndex = fridgeCategories.findIndex(c => c.id === categoryId);

          if (categoryIndex !== -1) {
            fridgeCategories[categoryIndex].name = newName;
            saveFridgeCategories();
          }
        }

        // Reset display
        itemEl.classList.remove('editing');
        itemEl.querySelector('.category-name').style.display = 'inline-block';
        itemEl.querySelector('.category-name-edit').style.display = 'none';
        itemEl.querySelector('.edit-category-btn').style.display = 'inline-block';
        itemEl.querySelector('.save-category-btn').style.display = 'none';

        // Restore the fridge data before refreshing display
        fridge = JSON.parse(JSON.stringify(currentFridge));

        // Refresh the display
        displayFridge();
      });
    });

    // Initialize sortable
    if (typeof Sortable !== 'undefined') {
      const sortable = Sortable.create(modalList, {
        handle: '.handle',
        animation: 150,
        onEnd: function() {
          // Update order based on new positions
          const items = modalList.querySelectorAll('.sortable-item');
          items.forEach((item, index) => {
            const categoryId = item.getAttribute('data-id');
            const categoryIndex = fridgeCategories.findIndex(c => c.id === categoryId);

            if (categoryIndex !== -1) {
              fridgeCategories[categoryIndex].order = index;
            }
          });

          saveFridgeCategories();

          // Restore the fridge data before refreshing display
          fridge = JSON.parse(JSON.stringify(currentFridge));

          displayFridge();
        }
      });
    }

    // Show the modal
    modal.style.display = 'block';

    // Add close button listener
    modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.style.display = 'none';

      // Restore the fridge data when closing the modal
      fridge = JSON.parse(JSON.stringify(currentFridge));
      displayFridge();
    });

    // Add click outside to close
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';

        // Restore the fridge data when closing the modal
        fridge = JSON.parse(JSON.stringify(currentFridge));
        displayFridge();
      }
    });
  };

  /**
   * Determine the appropriate category for a fridge item
   * @param {string} itemName - Name of the item
   * @param {string} existingCategory - Existing category if any
   * @returns {string} - Category ID
   */
  const determineFridgeCategory = (itemName, existingCategory) => {
    // If we already have a category assigned, keep it
    if (existingCategory && fridgeCategories.some(c => c.id === existingCategory)) {
      return existingCategory;
    }

    // Try to determine by common patterns
    const lowerName = itemName.toLowerCase();

    // Check for fruits & vegetables
    if (/apple|banana|orange|grape|berry|fruit|vegetable|lettuce|tomato|carrot|onion/i.test(lowerName)) {
      return 'fruits';
    }

    // Check for refrigerator items
    if (/milk|cheese|yogurt|butter|egg|cream|meat|chicken|beef|fish|cold/i.test(lowerName)) {
      return 'refrigerator';
    }

    // Check for freezer items
    if (/frozen|ice|freeze|cold/i.test(lowerName)) {
      return 'freezer';
    }

    // Check for pantry items
    if (/pasta|rice|bean|can|jar|flour|sugar|cereal|snack|chip|crackers|bread/i.test(lowerName)) {
      return 'pantry';
    }

    // Check for spices and herbs
    if (/spice|herb|salt|pepper|seasoning|oregano|basil|thyme/i.test(lowerName)) {
      return 'spices';
    }

    // Check for drinks
    if (/water|soda|juice|drink|beverage|coffee|tea|wine|beer|alcohol/i.test(lowerName)) {
      return 'drinks';
    }

    // Default to 'other' if no match
    return 'other';
  };

  /**
   * Display fridge contents in the UI
   */
  const displayFridge = () => {
    const fridgeList = document.getElementById('fridgeList');
    if (!fridgeList) {
      console.error('Fridge list element not found');
      return;
    }

    fridgeList.innerHTML = '';

    // If the fridge is empty, show a message
    if (Object.keys(fridge).length === 0) {
      const emptyMessage = document.createElement('li');
      emptyMessage.textContent = 'Your fridge is empty. Add some items!';
      emptyMessage.className = 'empty-message';
      fridgeList.appendChild(emptyMessage);
      return;
    }

    // If categories are disabled, display a simple list
    if (!isShowingCategories) {
      Object.keys(fridge).forEach(key => {
        const item = fridge[key];
        addFridgeItemToList(fridgeList, key, item);
      });
      return;
    }

    // Ensure all items have categories
    ensureFridgeItemCategories();

    // Group items by category
    const categorizedItems = {};

    // Initialize all categories (even empty ones)
    fridgeCategories.forEach(category => {
      categorizedItems[category.id] = [];
    });

    // Group items by category
    Object.keys(fridge).forEach(key => {
      const item = fridge[key];
      const category = item.category; // Category should already be assigned

      // Ensure the category exists in our categorizedItems
      if (!categorizedItems[category]) {
        // This might happen if a category was deleted
        // In this case, assign to 'other'
        categorizedItems['other'].push({ key, ...item });
      } else {
        categorizedItems[category].push({ key, ...item });
      }
    });

    // Get categories in the right order
    const orderedCategories = [...fridgeCategories].sort((a, b) => a.order - b.order);

    // Create UI for each category
    orderedCategories.forEach(category => {
      const items = categorizedItems[category.id];

      // Skip empty categories
      if (!items || items.length === 0) return;

      // Create category header
      const categoryHeader = document.createElement('li');
      categoryHeader.className = 'category-header';
      categoryHeader.setAttribute('data-id', category.id);
      categoryHeader.innerHTML = `
        <div class="category-name">${category.name}</div>
        <div class="category-count">${items.length} item${items.length !== 1 ? 's' : ''}</div>
      `;
      fridgeList.appendChild(categoryHeader);

      // Add items in this category
      items.forEach(item => {
        addFridgeItemToList(fridgeList, item.key, {
          name: item.name,
          quantity: item.quantity,
          unit: item.unit,
          category: category.id
        });
      });
    });
  };

  /**
   * Helper function to add a fridge item to the list
   * @param {HTMLElement} list - The list element
   * @param {string} key - Item key
   * @param {Object} item - Item data
   */
  const addFridgeItemToList = (list, key, item) => {
    const li = document.createElement('li');
    li.className = 'fridge-item';
    li.setAttribute('data-key', key);
    if (item.category) {
      li.setAttribute('data-category', item.category);
    }

    // Add quantity input and buttons
    const quantityControls = `
      <div class="quantity-controls">
        <button class="decrease-btn" data-key="${key}">-</button>
        <input type="number" class="quantity-input" value="${item.quantity}" min="0.1" step="0.1" data-key="${key}" inputmode="decimal">
        <button class="increase-btn" data-key="${key}">+</button>
      </div>
    `;

    li.innerHTML = `
      <span>${item.name}: </span>
      ${quantityControls}
      <span>${item.unit}</span>
      <div class="item-controls">
        <select class="category-select" data-key="${key}">
          ${fridgeCategories.map(c =>
            `<option value="${c.id}" ${item.category === c.id ? 'selected' : ''}>${c.name}</option>`
          ).join('')}
        </select>
        <button class="delete-btn" data-key="${key}">🗑️</button>
      </div>
    `;

    list.appendChild(li);

    // Add event listener for quantity changes
    li.querySelector('.quantity-input').addEventListener('change', (e) => {
      const key = e.target.dataset.key;
      const newQuantity = parseFloat(e.target.value);

      if (!isNaN(newQuantity) && newQuantity > 0) {
        editQuantity(key, newQuantity);
      } else {
        // Reset to original value if invalid
        e.target.value = fridge[key].quantity;
        Utility.showToast('Please enter a valid quantity (greater than 0).', 'warning');
      }
    });

    // Add event listener for increase button
    li.querySelector('.increase-btn').addEventListener('click', (e) => {
      const key = e.target.dataset.key;
      increaseQuantity(key);
    });

    // Add event listener for decrease button
    li.querySelector('.decrease-btn').addEventListener('click', (e) => {
      const key = e.target.dataset.key;
      decreaseQuantity(key);
    });

    // Add event listener for delete button
    li.querySelector('.delete-btn').addEventListener('click', (e) => {
      const key = e.target.dataset.key;
      deleteItem(key);
    });

    // Add event listener for category changes
    li.querySelector('.category-select').addEventListener('change', (e) => {
      const key = e.target.dataset.key;
      const newCategory = e.target.value;

      if (fridge[key]) {
        fridge[key].category = newCategory;
        updateFridge();
      }
    });
  };

  /**
   * Edit quantity of a fridge item directly
   * @param {string} key - Item key
   * @param {number} newQuantity - New quantity value
   */
  const editQuantity = (key, newQuantity) => {
    if (fridge[key]) {
      fridge[key].quantity = newQuantity;
      updateFridge();
    }
  };

  /**
   * Increase quantity of a fridge item
   * @param {string} key - Item key
   */
  const increaseQuantity = (key) => {
    if (fridge[key]) {
      // For integer values, increment by 1
      // For decimal values, increment by 0.1
      const currentQuantity = fridge[key].quantity;
      const isInteger = Number.isInteger(currentQuantity);

      fridge[key].quantity = isInteger ?
        currentQuantity + 1 :
        Math.round((currentQuantity + 0.1) * 10) / 10;

      updateFridge();
      displayFridge(); // Update UI immediately
    }
  };

  /**
   * Decrease quantity of a fridge item
   * @param {string} key - Item key
   */
  const decreaseQuantity = (key) => {
    if (fridge[key]) {
      // For integer values, decrement by 1
      // For decimal values, decrement by 0.1
      const currentQuantity = fridge[key].quantity;
      const isInteger = Number.isInteger(currentQuantity);

      const newQuantity = isInteger ?
        currentQuantity - 1 :
        Math.round((currentQuantity - 0.1) * 10) / 10;

      // Ensure quantity doesn't go below 0.1
      if (newQuantity >= 0.1) {
        fridge[key].quantity = newQuantity;
        updateFridge();
        displayFridge(); // Update UI immediately
      }
    }
  };

  /**
   * Delete a fridge item
   * @param {string} key - Item key
   */
  const deleteItem = (key) => {
    if (fridge[key]) {
      const itemName = fridge[key].name || 'Item';
      delete fridge[key];
      updateFridge();
      // Show a toast notification
      Utility.showToast(`${itemName} has been removed from your fridge.`, 'success');
      // Make sure the UI is updated
      displayFridge();
    } else {
      console.error(`Could not delete item with key: ${key}, item not found in fridge.`);
    }
  };

  /**
   * Update fridge data on the server
   */
  const updateFridge = async () => {
    try {
      // Ensure all items have categories before updating
      ensureFridgeItemCategories();

      // Before updating, save the current state to history
      saveFridgeHistory();

      await API.updateFridge(fridge);
      displayFridge();

      // Update the ingredient category dropdown
      populateCategorySelect();

      // Dispatch event for fridge update
      try {
        const event = new CustomEvent('fridgeUpdated');
        window.dispatchEvent(event);
        console.log('Fridge updated event dispatched');
      } catch (eventError) {
        console.error('Error dispatching fridge updated event:', eventError);
      }

      if (MealModule && typeof MealModule.findMissingIngredients === 'function') {
        MealModule.findMissingIngredients();
      }
    } catch (error) {
      console.error('Failed to update fridge:', error);
    }
  };

  /**
   * Save current fridge state to history for category preferences
   */
  const saveFridgeHistory = () => {
    try {
      // Get existing history or create a new one
      let history = {};
      const existingHistory = localStorage.getItem('fridgeHistory');

      if (existingHistory) {
        history = JSON.parse(existingHistory);
      }

      // Add current items to history, preserving their categories
      Object.keys(fridge).forEach(key => {
        const item = fridge[key];
        if (item.name && item.category) {
          // Use the name as key to avoid duplicates
          const normalizedName = item.name.toLowerCase();
          history[normalizedName] = {
            name: item.name,
            category: item.category
          };
        }
      });

      // Save back to localStorage
      localStorage.setItem('fridgeHistory', JSON.stringify(history));
    } catch (error) {
      console.error('Failed to save fridge history:', error);
    }
  };

  /**
   * Add a new food item to the fridge
   */
  const addFood = () => {
    const ingredientInput = document.getElementById('ingredientInput');
    const quantityInput = document.getElementById('quantityInput');
    const categorySelect = document.getElementById('ingredientCategorySelect');

    const name = ingredientInput.value.trim();
    const quantity = parseFloat(quantityInput.value);
    const category = categorySelect ? categorySelect.value : determineFridgeCategory(name);

    if (!name || isNaN(quantity) || quantity <= 0) {
      Utility.showToast('Please enter a valid ingredient name and quantity.', 'warning');
      return;
    }

    const unit = isUnitG ? 'g' : '';

    // Check if the item already exists in the fridge
    const existingItem = findIngredient(name);

    if (existingItem) {
      // Update existing item quantity
      fridge[existingItem.key].quantity += quantity;
      console.log(`Updated existing item ${name}, new quantity: ${fridge[existingItem.key].quantity}`);
    } else {
      // Add as new item - use the name as the key instead of timestamp
      fridge[name] = {
        name,
        quantity,
        unit,
        category
      };
      console.log(`Added new item ${name}, quantity: ${quantity}`);
    }

    ingredientInput.value = '';
    quantityInput.value = '';

    updateFridge();

    if (existingItem) {
      Utility.showToast(`Updated ${name} in your ${fridgeCategories.find(c => c.id === category)?.name || 'fridge'}.`, 'success');
    } else {
      Utility.showToast(`Added ${name} to your ${fridgeCategories.find(c => c.id === category)?.name || 'fridge'}.`, 'success');
    }
  };

  /**
   * Find an ingredient in the fridge
   * @param {string} name - Ingredient name
   * @returns {Object|null} - Found ingredient or null
   */
  const findIngredient = (name) => {
    // Normalize the name for case-insensitive comparison
    const normalizedName = name.toLowerCase();

    // Check if the item exists directly by name (which is now the key)
    if (fridge[name]) {
      return { key: name, ...fridge[name] };
    }

    // Also check with case-insensitive comparison
    const keys = Object.keys(fridge);
    for (const key of keys) {
      if (fridge[key].name.toLowerCase() === normalizedName) {
        return { key, ...fridge[key] };
      }
    }

    return null;
  };

  /**
   * Find previous usage of an ingredient to determine its preferred category
   * @param {string} name - Ingredient name
   * @returns {Object|null} - Previous usage information or null
   */
  const findIngredientPreviousUse = (name) => {
    // First check current fridge
    const currentItem = findIngredient(name);
    if (currentItem) {
      return currentItem;
    }

    // Also look in local storage history if we have it
    try {
      const fridgeHistory = localStorage.getItem('fridgeHistory');
      if (fridgeHistory) {
        const history = JSON.parse(fridgeHistory);
        for (const key in history) {
          if (history[key].name && history[key].name.toLowerCase() === name.toLowerCase()) {
            return history[key];
          }
        }
      }
    } catch (error) {
      console.log('Could not check fridge history:', error);
    }

    return null;
  };

  /**
   * Clear all fridge contents
   */
  const clearFridge = async () => {
    if (confirm('Are you sure you want to clear the fridge?')) {
      fridge = {};
      await updateFridge();
      displayFridge(); // Make sure the UI is updated
      Utility.showToast('Fridge has been cleared.', 'success');
    }
  };

  /**
   * Add grocery items to the fridge
   * @param {Array} groceryItems - Items to add to the fridge
   */
  const addGroceryItems = (groceryItems) => {
    if (!groceryItems || !Array.isArray(groceryItems) || groceryItems.length === 0) {
      console.error('Invalid or empty grocery items array:', groceryItems);
      return;
    }

    console.log('Adding grocery items to fridge:', groceryItems);

    // Process each item in the grocery list
    groceryItems.forEach(item => {
      if (!item || typeof item !== 'object' || !item.name) {
        console.error('Invalid grocery item:', item);
        return; // Skip this item
      }

      const existingItem = findIngredient(item.name);

      if (existingItem) {
        // Add to existing item
        fridge[existingItem.key].quantity += item.quantity;
        console.log(`Updated existing item ${item.name}, new quantity: ${fridge[existingItem.key].quantity}`);
      } else {
        // Add as new item - use the name as the key
        fridge[item.name] = {
          name: item.name,
          quantity: item.quantity,
          unit: item.unit || '',
          category: determineFridgeCategory(item.name) // Assign a category
        };
        console.log(`Added new item ${item.name}, quantity: ${item.quantity}`);
      }
    });

    // Update the fridge after all items have been processed
    updateFridge();
  };

  // Public API
  return {
    init,
    displayFridge,
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
    addFood,
    clearFridge,
    findIngredient,
    addGroceryItems,
    getFridge: () => fridge,
    populateIngredientList,
    editQuantity,
    toggleCategories,
    showFridgeCategoriesModal
  };
})();