/**
 * Grocery module for managing grocery list functionality
 */
const GroceryModule = (() => {
  // State
  let groceryList = [];

  // New state for categories and store preferences
  let storeSections = [];
  let isShoppingMode = false;
  let shoppingProgress = {
    total: 0,
    completed: 0,
    currentSection: null
  };

  /**
   * Initialize the grocery module
   */
  const init = () => {
    console.log('Grocery Module init called');
    loadStoreSections();
    loadGroceryList();
    setupEventListeners();
    displayGroceryList();
  };

  /**
   * Load store sections from localStorage or use defaults
   */
  const loadStoreSections = () => {
    try {
      const savedSections = localStorage.getItem('storeSections');
      if (savedSections) {
        storeSections = JSON.parse(savedSections);
      } else {
        // Use default if nothing is saved
        storeSections = StoreCategoriesData.defaultSectionOrder.map(section => ({
          id: section,
          name: StoreCategoriesData.categoryDisplayNames[section],
          order: StoreCategoriesData.defaultSectionOrder.indexOf(section)
        }));
        saveStoreSections();
      }
    } catch (error) {
      console.error('Error loading store sections:', error);
      // Fallback to defaults
      storeSections = StoreCategoriesData.defaultSectionOrder.map(section => ({
        id: section,
        name: StoreCategoriesData.categoryDisplayNames[section],
        order: StoreCategoriesData.defaultSectionOrder.indexOf(section)
      }));
    }
  };

  /**
   * Save store sections to localStorage
   */
  const saveStoreSections = () => {
    try {
      localStorage.setItem('storeSections', JSON.stringify(storeSections));
    } catch (error) {
      console.error('Error saving store sections:', error);
    }
  };

  /**
   * Load grocery list from localStorage
   */
  const loadGroceryList = () => {
    try {
      const savedList = localStorage.getItem('groceryList');
      if (savedList) {
        groceryList = JSON.parse(savedList);

        // Add category to existing items if missing
        groceryList.forEach(item => {
          if (!item.category) {
            item.category = StoreCategoriesData.determineCategory(item.name);
          }
          if (!item.id) {
            item.id = Date.now() + Math.random().toString(36).substring(2, 9);
          }
        });
      }
    } catch (error) {
      console.error('Error loading grocery list:', error);
      groceryList = [];
    }
  };

  /**
   * Save grocery list to localStorage
   */
  const saveGroceryList = () => {
    try {
      localStorage.setItem('groceryList', JSON.stringify(groceryList));
    } catch (error) {
      console.error('Error saving grocery list:', error);
    }
  };

  /**
   * Set up event listeners for grocery functionality
   */
  const setupEventListeners = () => {
    document.getElementById('clearGroceryBtn').addEventListener('click', clearGroceryList);
    document.getElementById('sendToFridgeBtn').addEventListener('click', sendGroceryListToFridge);
    document.getElementById('exportGroceryBtn').addEventListener('click', saveGroceryListToFile);

    // Grocery menu toggle button
    document.getElementById('groceryMenuBtn').addEventListener('click', toggleGroceryMenu);

    // Store Layout button
    document.getElementById('storeLayoutBtn').addEventListener('click', openStoreLayoutModal);

    // Get Grocery Links button
    document.getElementById('getGroceryLinksBtn').addEventListener('click', exportGroceryLinks);

    // Modal close button
    document.querySelector('.close-modal').addEventListener('click', closeStoreLayoutModal);

    // Reset store layout button
    document.getElementById('resetStoreLayout').addEventListener('click', resetStoreLayout);

    // Save store layout button
    document.getElementById('saveStoreLayout').addEventListener('click', saveCustomStoreLayout);

    // Shopping mode toggle
    document.getElementById('toggleShoppingModeBtn').addEventListener('click', toggleShoppingMode);

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === document.getElementById('storeLayoutModal')) {
        closeStoreLayoutModal();
      }

      // Close grocery menu when clicking outside
      const groceryMenu = document.getElementById('groceryMenu');
      const groceryMenuBtn = document.getElementById('groceryMenuBtn');
      if (groceryMenu && !groceryMenu.contains(e.target) && e.target !== groceryMenuBtn) {
        groceryMenu.style.display = 'none';
      }
    });
  };

  /**
   * Display grocery list in the UI
   */
  const displayGroceryList = () => {
    const groceryListEl = document.getElementById('groceryList');

    // Clear the current list
    groceryListEl.innerHTML = '';

    // If list is empty, show a message
    if (groceryList.length === 0) {
      groceryListEl.innerHTML = '<li class="empty-list">Your grocery list is empty.</li>';
      return;
    }

    // Create a map of category to items
    const categorizedItems = {};

    // Initialize all categories (even empty ones)
    storeSections.forEach(section => {
      categorizedItems[section.id] = [];
    });

    // Group items by category
    groceryList.forEach(item => {
      const category = item.category || 'other';
      if (!categorizedItems[category]) {
        categorizedItems[category] = [];
      }
      categorizedItems[category].push(item);
    });

    // Get sections in the right order
    const orderedSections = [...storeSections].sort((a, b) => a.order - b.order);

    // Loop through categories in order and display items
    orderedSections.forEach(section => {
      const items = categorizedItems[section.id];

      // Skip empty categories
      if (!items || items.length === 0) return;

      // Create section header
      const sectionHeader = document.createElement('li');
      sectionHeader.className = 'category-header';
      sectionHeader.setAttribute('data-id', section.id);
      sectionHeader.innerHTML = `
        <div class="category-name">${section.name}</div>
        <div class="category-count">${items.length} item${items.length !== 1 ? 's' : ''}</div>
      `;
      groceryListEl.appendChild(sectionHeader);

      // Add items in this category
      items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'grocery-item';
        listItem.setAttribute('data-id', item.id);
        listItem.setAttribute('data-category', item.category);

        // In shopping mode, add a checkbox
        if (isShoppingMode) {
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.className = 'shopping-checkbox';
          checkbox.addEventListener('change', updateShoppingProgress);
          listItem.appendChild(checkbox);
        }

        // Add item details
        const itemName = document.createElement('div');
        itemName.className = 'item-name';
        itemName.textContent = item.name;
        listItem.appendChild(itemName);

        // Add quantity controls with +/- buttons and editable input
        const quantityControls = document.createElement('div');
        quantityControls.className = 'quantity-controls';
        quantityControls.innerHTML = `
          <button class="decrease-btn" data-id="${item.id}">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="0.1" step="0.1" data-id="${item.id}" inputmode="decimal">
          <button class="increase-btn" data-id="${item.id}">+</button>
          <span class="unit-text">${item.unit}</span>
        `;
        listItem.appendChild(quantityControls);

        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-item-btn';
        deleteBtn.textContent = '×';
        deleteBtn.addEventListener('click', () => removeGroceryItem(item.id));
        listItem.appendChild(deleteBtn);

        // Add event listeners for quantity controls
        const quantityInput = quantityControls.querySelector('.quantity-input');
        const increaseBtn = quantityControls.querySelector('.increase-btn');
        const decreaseBtn = quantityControls.querySelector('.decrease-btn');

        quantityInput.addEventListener('change', (e) => {
          const newQuantity = parseFloat(e.target.value);
          if (!isNaN(newQuantity) && newQuantity > 0) {
            updateGroceryItemQuantity(item.id, newQuantity);
          } else {
            e.target.value = item.quantity;
            Utility.showToast('Please enter a valid quantity (greater than 0).', 'warning');
          }
        });

        increaseBtn.addEventListener('click', () => {
          increaseGroceryItemQuantity(item.id);
        });

        decreaseBtn.addEventListener('click', () => {
          decreaseGroceryItemQuantity(item.id);
        });

        groceryListEl.appendChild(listItem);
      });
    });

    // If in shopping mode, display shopping progress and highlight current section
    if (isShoppingMode) {
      displayShoppingProgress();
      highlightCurrentShoppingSection();
    }
  };

  /**
   * Add an item to the grocery list
   * @param {string} name - Item name
   * @param {number} quantity - Item quantity
   * @param {string} unit - Item unit
   */
  const addToGroceryList = (name, quantity, unit = '') => {
    if (!name || !quantity) {
      console.error('Invalid grocery item');
      return;
    }

    // Find existing item by name
    const existingIndex = groceryList.findIndex(item =>
      item.name.toLowerCase() === name.toLowerCase()
    );

    if (existingIndex !== -1) {
      // Update existing item quantity
      groceryList[existingIndex].quantity += Number(quantity);
    } else {
      // Add new item with category and ID
      const category = StoreCategoriesData.determineCategory(name);
      const id = Date.now() + Math.random().toString(36).substring(2, 9);

      groceryList.push({
        name,
        quantity: Number(quantity),
        unit,
        category,
        id
      });
    }

    saveGroceryList();
    displayGroceryList();
  };

  /**
   * Remove an item from the grocery list
   * @param {string} id - Item ID
   */
  const removeGroceryItem = (id) => {
    const index = groceryList.findIndex(item => item.id === id);

    if (index !== -1) {
      groceryList.splice(index, 1);
      saveGroceryList();
      displayGroceryList();

      // Update shopping progress if in shopping mode
      if (isShoppingMode) {
        updateShoppingProgressCounts();
      }
    }
  };

  /**
   * Clear the grocery list
   */
  const clearGroceryList = () => {
    if (groceryList.length === 0 || confirm('Are you sure you want to clear the grocery list?')) {
      groceryList = [];
      saveGroceryList();
      displayGroceryList();

      // Exit shopping mode if active
      if (isShoppingMode) {
        toggleShoppingMode();
      }
    }
  };

  /**
   * Send grocery list items to the fridge
   */
  const sendGroceryListToFridge = () => {
    if (groceryList.length === 0) {
      alert('Your grocery list is empty!');
      return;
    }

    // Create a deep copy of the grocery list to prevent issues when it's cleared
    // Print notification before copying list
    console.log('Sending grocery list to fridge:', groceryList);
    const groceryItemsCopy = JSON.parse(JSON.stringify(groceryList));

    // Add items to fridge using the copy
    FridgeModule.addGroceryItems(groceryItemsCopy);

    // Only clear the list after confirming items were added
    clearGroceryList();
    Utility.showToast('Grocery items added to fridge!', 'success');
  };

  /**
   * Export grocery list to a file
   */
  const saveGroceryListToFile = () => {
    if (groceryList.length === 0) {
      alert('Your grocery list is empty!');
      return;
    }

    // Create a map of category to items
    const categorizedItems = {};

    // Initialize all categories (even empty ones)
    storeSections.forEach(section => {
      categorizedItems[section.id] = [];
    });

    // Group items by category
    groceryList.forEach(item => {
      const category = item.category || 'other';
      if (!categorizedItems[category]) {
        categorizedItems[category] = [];
      }
      categorizedItems[category].push(item);
    });

    // Get sections in the right order
    const orderedSections = [...storeSections].sort((a, b) => a.order - b.order);

    // Generate text content with category headers
    let textContent = '';

    // Loop through categories in order and add items to text
    orderedSections.forEach(section => {
      const items = categorizedItems[section.id];

      // Skip empty categories
      if (!items || items.length === 0) return;

      // Add section header
      textContent += `### ${section.name} ###\n`;

      // Add items in this category
      items.forEach(item => {
        textContent += `${item.name} ${item.quantity} ${item.unit}\n`;
      });

      // Add a blank line between categories
      textContent += '\n';
    });

    // Create and trigger download
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'grocery-list.txt';
    a.click();

    URL.revokeObjectURL(url);
  };

  /**
   * Export grocery list as website links
   * BASE_URL can be modified to use any search engine or store website
   */
  const exportGroceryLinks = () => {
    if (groceryList.length === 0) {
      alert('Your grocery list is empty!');
      return;
    }

    // Hard-coded base URL - modify this to change the search engine/website
    // Examples:
    // - Google: 'https://www.google.com/search?q='
    // - DuckDuckGo: 'https://duckduckgo.com/?q='
    // - Amazon: 'https://www.amazon.com/s?k='
    // - Walmart: 'https://www.walmart.com/search?q='
    const BASE_URL = 'https://www.google.com/search?q=';

    // Generate URLs for each item
    let textContent = '';

    groceryList.forEach(item => {
      // URL encode the item name (replaces spaces with %20, etc.)
      const encodedItemName = encodeURIComponent(item.name);
      const itemUrl = BASE_URL + encodedItemName;
      textContent += itemUrl + '\n';
    });

    // Create and trigger download
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'grocery-links.txt';
    a.click();

    URL.revokeObjectURL(url);

    Utility.showToast('Grocery links file downloaded!', 'success');
  };

  /**
   * Open the store layout modal and display current layout
   */
  const openStoreLayoutModal = () => {
    // Display the modal
    const modal = document.getElementById('storeLayoutModal');
    modal.style.display = 'block';

    // Populate the sections list
    displayStoreSections();
  };

  /**
   * Close the store layout modal
   */
  const closeStoreLayoutModal = () => {
    document.getElementById('storeLayoutModal').style.display = 'none';
  };

  /**
   * Toggle the grocery menu visibility
   */
  const toggleGroceryMenu = () => {
    const groceryMenu = document.getElementById('groceryMenu');
    if (groceryMenu.style.display === 'none' || groceryMenu.style.display === '') {
      groceryMenu.style.display = 'block';
    } else {
      groceryMenu.style.display = 'none';
    }
  };

  /**
   * Display the store sections in the sortable list
   */
  const displayStoreSections = () => {
    const sectionsList = document.getElementById('storeSectionsList');
    sectionsList.innerHTML = '';

    // Sort sections by current order
    const orderedSections = [...storeSections].sort((a, b) => a.order - b.order);

    // Add sections to the list
    orderedSections.forEach((section) => {
      const listItem = document.createElement('li');
      listItem.className = 'sortable-item';
      listItem.setAttribute('data-id', section.id);

      listItem.innerHTML = `
        <div class="drag-handle">
          <i class="fas fa-grip-lines"></i>≡
        </div>
        <div class="section-name">${section.name}</div>
      `;

      // Add drag functionality
      listItem.draggable = true;
      listItem.addEventListener('dragstart', dragStart);
      listItem.addEventListener('dragover', dragOver);
      listItem.addEventListener('drop', drop);
      listItem.addEventListener('dragend', dragEnd);

      sectionsList.appendChild(listItem);
    });
  };

  /**
   * Reset store layout to default
   */
  const resetStoreLayout = () => {
    storeSections = StoreCategoriesData.defaultSectionOrder.map((section, index) => ({
      id: section,
      name: StoreCategoriesData.categoryDisplayNames[section],
      order: index
    }));

    saveStoreSections();
    displayStoreSections();
    displayGroceryList(); // Re-display with new order

  };

  /**
   * Save custom store layout from the sortable list
   */
  const saveCustomStoreLayout = () => {
    const sectionItems = document.querySelectorAll('#storeSectionsList .sortable-item');

    // Update the order of sections based on their position in the list
    sectionItems.forEach((item, index) => {
      const sectionId = item.getAttribute('data-id');
      const section = storeSections.find(s => s.id === sectionId);
      if (section) {
        section.order = index;
      }
    });

    saveStoreSections();
    displayGroceryList(); // Re-display with new order
    closeStoreLayoutModal();
  };

  // Drag and drop functionality
  let draggedItem = null;

  const dragStart = function(e) {
    draggedItem = this;
    setTimeout(() => this.classList.add('dragging'), 0);

    // Required for Firefox
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  };

  const dragOver = function(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const container = this.parentNode;
    const afterElement = getDragAfterElement(container, e.clientY);

    if (afterElement) {
      container.insertBefore(draggedItem, afterElement);
    } else {
      container.appendChild(draggedItem);
    }
  };

  const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  };

  const drop = function(e) {
    e.stopPropagation();
    return false;
  };

  const dragEnd = function() {
    this.classList.remove('dragging');
    draggedItem = null;
  };

  /**
   * Toggle shopping mode on/off
   */
  const toggleShoppingMode = () => {
    isShoppingMode = !isShoppingMode;
    const button = document.getElementById('toggleShoppingModeBtn');

    if (isShoppingMode) {
      button.textContent = 'Exit Shopping Mode';
      button.classList.add('active');
      enterShoppingMode();
    } else {
      button.textContent = 'Enter Shopping Mode';
      button.classList.remove('active');
      exitShoppingMode();
    }
  };

  /**
   * Enter shopping mode - optimize display for in-store use
   */
  const enterShoppingMode = () => {
    // Calculate shopping progress
    updateShoppingProgressCounts();

    // Add shopping mode class to container
    document.querySelector('.grocery').classList.add('shopping-mode');

    // Display the list with checkboxes
    displayGroceryList();

    // Display progress bar
    displayShoppingProgress();

    // Highlight the first section
    highlightCurrentShoppingSection();
  };

  /**
   * Update shopping progress counts
   */
  const updateShoppingProgressCounts = () => {
    shoppingProgress.total = groceryList.length;
    shoppingProgress.completed = 0;

    // Count checked items
    document.querySelectorAll('.shopping-checkbox:checked').forEach(() => {
      shoppingProgress.completed++;
    });
  };

  /**
   * Display shopping progress bar
   */
  const displayShoppingProgress = () => {
    // Remove existing progress bar if any
    const existingProgress = document.querySelector('.shopping-progress');
    if (existingProgress) {
      existingProgress.remove();
    }

    // Create new progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'shopping-progress';
    progressBar.innerHTML = `
      <div class="progress-bar">
        <div class="progress" style="width: ${(shoppingProgress.completed / shoppingProgress.total) * 100}%"></div>
      </div>
      <div class="progress-text">
        <span class="progress-count">${shoppingProgress.completed}/${shoppingProgress.total}</span> items
      </div>
    `;

    // Insert progress bar at the top of the grocery list
    const groceryListEl = document.getElementById('groceryList');
    groceryListEl.parentNode.insertBefore(progressBar, groceryListEl);
  };

  /**
   * Exit shopping mode - return to normal display
   */
  const exitShoppingMode = () => {
    // Remove shopping mode class
    document.querySelector('.grocery').classList.remove('shopping-mode');

    // Remove progress bar
    const progressBar = document.querySelector('.shopping-progress');
    if (progressBar) {
      progressBar.remove();
    }

    // Re-display the list normally
    displayGroceryList();
  };

  /**
   * Update shopping progress when items are checked
   */
  const updateShoppingProgress = (e) => {
    const checkbox = e.target;
    const item = checkbox.closest('.grocery-item');

    if (checkbox.checked) {
      item.classList.add('item-purchased');
      shoppingProgress.completed++;
    } else {
      item.classList.remove('item-purchased');
      shoppingProgress.completed--;
    }

    // Update progress bar
    const progressPercent = (shoppingProgress.completed / shoppingProgress.total) * 100;
    document.querySelector('.progress').style.width = `${progressPercent}%`;
    document.querySelector('.progress-count').textContent = `${shoppingProgress.completed}/${shoppingProgress.total}`;

    // Update current section highlight
    highlightCurrentShoppingSection();

    // Check if shopping is complete
    if (shoppingProgress.completed === shoppingProgress.total) {
      setTimeout(() => {
        if (confirm('You\'ve checked off all items! Would you like to exit shopping mode?')) {
          toggleShoppingMode();
        }
      }, 500);
    }
  };

  /**
   * Update the quantity of a grocery item
   * @param {string} id - Item ID
   * @param {number} newQuantity - New quantity value
   */
  const updateGroceryItemQuantity = (id, newQuantity) => {
    const item = groceryList.find(item => item.id === id);
    if (item) {
      item.quantity = newQuantity;
      saveGroceryList();
      displayGroceryList();
    }
  };

  /**
   * Increase the quantity of a grocery item
   * @param {string} id - Item ID
   */
  const increaseGroceryItemQuantity = (id) => {
    const item = groceryList.find(item => item.id === id);
    if (item) {
      item.quantity += 1;
      saveGroceryList();
      displayGroceryList();
    }
  };

  /**
   * Decrease the quantity of a grocery item
   * @param {string} id - Item ID
   */
  const decreaseGroceryItemQuantity = (id) => {
    const item = groceryList.find(item => item.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      saveGroceryList();
      displayGroceryList();
    }
  };

  /**
   * Highlight the current section based on shopping progress
   */
  const highlightCurrentShoppingSection = () => {
    // Remove current highlight
    document.querySelectorAll('.category-header').forEach(header => {
      header.classList.remove('current-section');
    });

    // Get ordered sections
    const orderedSections = [...storeSections].sort((a, b) => a.order - b.order);

    // Find the first section that has unchecked items
    for (const section of orderedSections) {
      const sectionHeader = document.querySelector(`.category-header[data-id="${section.id}"]`);
      if (!sectionHeader) continue;

      // Check if this section has unchecked items
      const sectionItems = document.querySelectorAll(`.grocery-item[data-category="${section.id}"]`);
      let hasUncheckedItems = false;

      for (const item of sectionItems) {
        const checkbox = item.querySelector('.shopping-checkbox');
        if (checkbox && !checkbox.checked) {
          hasUncheckedItems = true;
          break;
        }
      }

      if (hasUncheckedItems) {
        sectionHeader.classList.add('current-section');

        // Scroll to this section if it's not visible
        setTimeout(() => {
          sectionHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);

        // Update current section in shopping progress
        shoppingProgress.currentSection = section.id;
        break;
      }
    }
  };

  // Public API
  return {
    init,
    displayGroceryList,
    addToGroceryList,
    removeGroceryItem,
    clearGroceryList,
    sendGroceryListToFridge,
    saveGroceryListToFile,
    openStoreLayoutModal
  };
})();