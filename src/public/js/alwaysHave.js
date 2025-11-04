/**
 * AlwaysHave module for managing items that are always in stock
 * These items won't appear in grocery lists
 */
const AlwaysHaveModule = (() => {
  // State
  let alwaysHaveItems = [];

  /**
   * Initialize the always-have module
   */
  const init = () => {
    console.log('AlwaysHave Module init called');
    loadAlwaysHaveItems();
    populateAlwaysHaveIngredientList();
    setupEventListeners();
    displayAlwaysHaveList();
  };

  /**
   * Load always-have items from localStorage
   */
  const loadAlwaysHaveItems = () => {
    try {
      const savedItems = localStorage.getItem('alwaysHaveItems');
      if (savedItems) {
        alwaysHaveItems = JSON.parse(savedItems);
      }
    } catch (error) {
      console.error('Error loading always-have items:', error);
      alwaysHaveItems = [];
    }
  };

  /**
   * Save always-have items to localStorage
   */
  const saveAlwaysHaveItems = () => {
    try {
      localStorage.setItem('alwaysHaveItems', JSON.stringify(alwaysHaveItems));

      // Dispatch event for other modules to update
      const event = new CustomEvent('alwaysHaveUpdated');
      window.dispatchEvent(event);
    } catch (error) {
      console.error('Error saving always-have items:', error);
    }
  };

  /**
   * Populate the ingredient datalist with all available ingredients
   */
  const populateAlwaysHaveIngredientList = () => {
    try {
      const ingredients = new Set();

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
        console.log('Recipes not yet available for always-have ingredients list');
      }

      // Try to get fridge items
      try {
        if (FridgeModule && typeof FridgeModule.getFridge === 'function') {
          const fridge = FridgeModule.getFridge();
          Object.values(fridge).forEach(item => {
            if (item && item.name) {
              ingredients.add(item.name);
            }
          });
        }
      } catch (fridgeError) {
        console.log('Fridge not yet available for always-have ingredients list');
      }

      // Convert to sorted array
      const sortedIngredients = Array.from(ingredients).sort();

      // Populate datalist
      const datalist = document.getElementById('alwaysHaveIngredientList');
      if (datalist) {
        datalist.innerHTML = '';

        sortedIngredients.forEach(ingredient => {
          const option = document.createElement('option');
          option.value = ingredient;
          datalist.appendChild(option);
        });
      }

      // Listen for recipe data loaded event to update the list
      window.addEventListener('recipeDataLoaded', populateAlwaysHaveIngredientList, { once: true });
    } catch (error) {
      console.error('Failed to populate always-have ingredient list:', error);
    }
  };

  /**
   * Set up event listeners
   */
  const setupEventListeners = () => {
    document.getElementById('addAlwaysHaveBtn').addEventListener('click', addAlwaysHaveItem);
    document.getElementById('clearAlwaysHaveBtn').addEventListener('click', clearAlwaysHaveList);

    // Add auto-complete functionality to ingredient input
    const ingredientInput = document.getElementById('alwaysHaveInput');
    if (ingredientInput) {
      ingredientInput.addEventListener('input', handleIngredientInput);
      ingredientInput.addEventListener('keyup', handleIngredientInput);
      ingredientInput.addEventListener('change', handleIngredientInput);

      // Combined keydown handler for both dropdown navigation and Enter key
      ingredientInput.addEventListener('keydown', (e) => {
        const dropdown = document.getElementById('alwaysHaveAutocompleteDropdown');

        // Handle Enter key
        if (e.key === 'Enter') {
          if (!dropdown || !dropdown.classList.contains('show')) {
            e.preventDefault();
            addAlwaysHaveItem();
          }
          // If dropdown is showing, handleDropdownKeyboard will handle it
        }

        // Handle dropdown keyboard navigation
        handleDropdownKeyboard(e);
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('alwaysHaveAutocompleteDropdown');
        if (dropdown && !ingredientInput.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.remove('show');
        }
      });

      // Close dropdown on blur
      ingredientInput.addEventListener('blur', () => {
        setTimeout(() => {
          const dropdown = document.getElementById('alwaysHaveAutocompleteDropdown');
          if (dropdown) {
            dropdown.classList.remove('show');
          }
        }, 200);
      });
    }
  };

  /**
   * Handle input in the ingredient field for auto-completion
   */
  const handleIngredientInput = (e) => {
    const input = e.target;
    const inputValue = input.value.trim();
    const dropdown = document.getElementById('alwaysHaveAutocompleteDropdown');

    // Hide dropdown if input is empty
    if (inputValue.length < 1) {
      dropdown.classList.remove('show');
      return;
    }

    // Get all ingredients
    const ingredients = new Set();

    // Add recipe ingredients if MealModule is available
    try {
      if (MealModule && typeof MealModule.getAllRecipes === 'function') {
        const recipes = MealModule.getAllRecipes();
        if (recipes && typeof recipes === 'object') {
          Object.values(recipes).forEach(recipe => {
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
      console.log('Recipe module not yet loaded');
    }

    // Add fridge items
    try {
      if (FridgeModule && typeof FridgeModule.getFridge === 'function') {
        const fridge = FridgeModule.getFridge();
        Object.values(fridge).forEach(item => {
          if (item && item.name) {
            ingredients.add(item.name);
          }
        });
      }
    } catch (error) {
      console.log('Fridge module not yet loaded');
    }

    // Convert to array for filtering
    const allIngredients = Array.from(ingredients);

    // Find matching ingredients (case-insensitive search)
    const startsWithMatches = allIngredients
      .filter(name => name.toLowerCase().startsWith(inputValue.toLowerCase()))
      .sort();

    const matchingIngredients = startsWithMatches.length > 0
      ? startsWithMatches
      : allIngredients
          .filter(name => name.toLowerCase().includes(inputValue.toLowerCase()))
          .sort();

    // Show dropdown with matching options
    showAutocompleteDropdown(dropdown, matchingIngredients, input);

    // If exactly one match, auto-complete
    if (matchingIngredients.length === 1) {
      const matchedIngredient = matchingIngredients[0];
      if (input.value !== matchedIngredient) {
        input.value = matchedIngredient;
      }
      dropdown.classList.remove('show');
    }
  };

  /**
   * Show autocomplete dropdown with matching ingredients
   */
  const showAutocompleteDropdown = (dropdown, matches, input) => {
    dropdown.innerHTML = '';

    if (matches.length === 0) {
      dropdown.classList.remove('show');
      return;
    }

    const displayMatches = matches.slice(0, 10);

    displayMatches.forEach((ingredient, index) => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      item.textContent = ingredient;

      if (index === 0) {
        item.classList.add('highlighted');
      }

      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        selectIngredient(ingredient, input);
      });

      dropdown.appendChild(item);
    });

    if (matches.length > 10) {
      const moreItem = document.createElement('div');
      moreItem.className = 'autocomplete-no-results';
      moreItem.textContent = `... and ${matches.length - 10} more`;
      dropdown.appendChild(moreItem);
    }

    dropdown.classList.add('show');
  };

  /**
   * Select an ingredient from the dropdown
   */
  const selectIngredient = (ingredient, input) => {
    const dropdown = document.getElementById('alwaysHaveAutocompleteDropdown');
    input.value = ingredient;
    dropdown.classList.remove('show');
    input.focus();
  };

  /**
   * Handle keyboard navigation in the dropdown
   */
  const handleDropdownKeyboard = (e) => {
    const dropdown = document.getElementById('alwaysHaveAutocompleteDropdown');

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
        if (highlighted) highlighted.classList.remove('highlighted');
        currentIndex = (currentIndex + 1) % items.length;
        items[currentIndex].classList.add('highlighted');
        items[currentIndex].scrollIntoView({ block: 'nearest' });
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (highlighted) highlighted.classList.remove('highlighted');
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
   * Add an item to the always-have list
   */
  const addAlwaysHaveItem = () => {
    const input = document.getElementById('alwaysHaveInput');
    const itemName = input.value.trim();

    if (!itemName) {
      Utility.showToast('Please enter an item name.', 'warning');
      return;
    }

    // Check if item already exists (case-insensitive)
    const existingItem = alwaysHaveItems.find(
      item => item.name.toLowerCase() === itemName.toLowerCase()
    );

    if (existingItem) {
      Utility.showToast(`${itemName} is already in your always-have list.`, 'warning');
      input.value = '';
      return;
    }

    // Add the item
    alwaysHaveItems.push({
      name: itemName,
      id: Date.now() + Math.random().toString(36).substring(2, 9)
    });

    saveAlwaysHaveItems();
    displayAlwaysHaveList();
    input.value = '';

    Utility.showToast(`Added ${itemName} to always-have list.`, 'success');
  };

  /**
   * Remove an item from the always-have list
   */
  const removeAlwaysHaveItem = (id) => {
    const index = alwaysHaveItems.findIndex(item => item.id === id);

    if (index !== -1) {
      const itemName = alwaysHaveItems[index].name;
      alwaysHaveItems.splice(index, 1);
      saveAlwaysHaveItems();
      displayAlwaysHaveList();
      Utility.showToast(`Removed ${itemName} from always-have list.`, 'success');
    }
  };

  /**
   * Clear all always-have items
   */
  const clearAlwaysHaveList = () => {
    if (alwaysHaveItems.length === 0 || confirm('Are you sure you want to clear all always-have items?')) {
      alwaysHaveItems = [];
      saveAlwaysHaveItems();
      displayAlwaysHaveList();
      Utility.showToast('Always-have list cleared.', 'success');
    }
  };

  /**
   * Display the always-have list in the UI
   */
  const displayAlwaysHaveList = () => {
    const listElement = document.getElementById('alwaysHaveList');

    if (!listElement) {
      console.error('Always-have list element not found');
      return;
    }

    listElement.innerHTML = '';

    if (alwaysHaveItems.length === 0) {
      const emptyMessage = document.createElement('li');
      emptyMessage.textContent = 'No items yet. Add items you always keep in stock.';
      emptyMessage.className = 'empty-message';
      listElement.appendChild(emptyMessage);
      return;
    }

    // Sort items alphabetically
    const sortedItems = [...alwaysHaveItems].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    sortedItems.forEach(item => {
      const li = document.createElement('li');
      li.className = 'always-have-item';
      li.innerHTML = `
        <span class="item-name">${item.name}</span>
        <button class="delete-item-btn" data-id="${item.id}">×</button>
      `;

      li.querySelector('.delete-item-btn').addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        removeAlwaysHaveItem(id);
      });

      listElement.appendChild(li);
    });
  };

  /**
   * Check if an ingredient is in the always-have list
   * @param {string} ingredientName - Name of the ingredient
   * @returns {boolean} - True if the ingredient is in the always-have list
   */
  const isAlwaysHave = (ingredientName) => {
    return alwaysHaveItems.some(
      item => item.name.toLowerCase() === ingredientName.toLowerCase()
    );
  };

  /**
   * Get all always-have item names
   * @returns {Array<string>} - Array of item names
   */
  const getAlwaysHaveItems = () => {
    return alwaysHaveItems.map(item => item.name);
  };

  // Public API
  return {
    init,
    isAlwaysHave,
    getAlwaysHaveItems,
    displayAlwaysHaveList
  };
})();
