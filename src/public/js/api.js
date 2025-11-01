/**
 * API module for handling local storage (Client-Side Only - No Server Required)
 * All data is stored in browser's localStorage
 */
const API = {
  /**
   * Fetch fridge data from localStorage
   * @returns {Promise<Object>} - Fridge data
   */
  fetchFridge: async () => {
    try {
      const fridgeData = localStorage.getItem('chilifridge_fridge');
      if (fridgeData) {
        return JSON.parse(fridgeData);
      }
      // Return empty fridge if no data exists
      return {};
    } catch (error) {
      console.error('Error fetching fridge data from localStorage:', error);
      return {};
    }
  },

  /**
   * Update fridge data in localStorage
   * @param {Object} fridgeData - Updated fridge data
   * @returns {Promise<Object>} - Response message
   */
  updateFridge: async (fridgeData) => {
    try {
      // Make sure we have valid data to save
      if (!fridgeData || typeof fridgeData !== 'object') {
        console.error('Invalid fridge data for update:', fridgeData);
        throw new Error('Invalid fridge data');
      }

      console.log('Saving fridge data to localStorage...');

      // Save to localStorage
      localStorage.setItem('chilifridge_fridge', JSON.stringify(fridgeData));

      console.log('Fridge data saved successfully');
      return { success: true, message: 'Fridge updated successfully' };
    } catch (error) {
      console.error('Error updating fridge data in localStorage:', error);
      throw error;
    }
  },

  /**
   * Fetch recipe data (embedded in app)
   * @returns {Promise<Object>} - Recipe data
   */
  fetchRecipes: async () => {
    try {
      // Check if we have custom recipes in localStorage
      const customRecipes = localStorage.getItem('chilifridge_custom_recipes');
      if (customRecipes) {
        const parsed = JSON.parse(customRecipes);
        // Merge with default recipes
        return { ...RECIPES_DATA, ...parsed };
      }

      // Return embedded recipes
      return RECIPES_DATA;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return RECIPES_DATA;
    }
  },

  /**
   * Fetch a specific recipe by name
   * @param {string} name - Recipe name
   * @returns {Promise<Array>} - Recipe ingredients
   */
  fetchRecipeByName: async (name) => {
    try {
      const recipes = await API.fetchRecipes();
      if (recipes[name]) {
        return recipes[name];
      }
      return null;
    } catch (error) {
      console.error('Error fetching recipe:', error);
      return null;
    }
  },

  /**
   * Save custom recipe to localStorage
   * @param {string} name - Recipe name
   * @param {Array} ingredients - Recipe ingredients
   * @returns {Promise<Object>} - Response message
   */
  saveCustomRecipe: async (name, ingredients) => {
    try {
      const customRecipes = localStorage.getItem('chilifridge_custom_recipes');
      const recipes = customRecipes ? JSON.parse(customRecipes) : {};

      recipes[name] = ingredients;
      localStorage.setItem('chilifridge_custom_recipes', JSON.stringify(recipes));

      return { success: true, message: 'Recipe saved successfully' };
    } catch (error) {
      console.error('Error saving custom recipe:', error);
      throw error;
    }
  },

  /**
   * Export all data (for backup)
   * @returns {Object} - All app data
   */
  exportData: () => {
    try {
      return {
        fridge: localStorage.getItem('chilifridge_fridge'),
        customRecipes: localStorage.getItem('chilifridge_custom_recipes'),
        calendar: localStorage.getItem('mealCalendar'),
        groceryList: localStorage.getItem('groceryList'),
        fridgeCategories: localStorage.getItem('fridgeCategories'),
        fridgeHistory: localStorage.getItem('fridgeHistory'),
        storeLayout: localStorage.getItem('storeLayout')
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      return {};
    }
  },

  /**
   * Import data (for restore from backup)
   * @param {Object} data - Data to import
   * @returns {Promise<Object>} - Response message
   */
  importData: async (data) => {
    try {
      if (data.fridge) localStorage.setItem('chilifridge_fridge', data.fridge);
      if (data.customRecipes) localStorage.setItem('chilifridge_custom_recipes', data.customRecipes);
      if (data.calendar) localStorage.setItem('mealCalendar', data.calendar);
      if (data.groceryList) localStorage.setItem('groceryList', data.groceryList);
      if (data.fridgeCategories) localStorage.setItem('fridgeCategories', data.fridgeCategories);
      if (data.fridgeHistory) localStorage.setItem('fridgeHistory', data.fridgeHistory);
      if (data.storeLayout) localStorage.setItem('storeLayout', data.storeLayout);

      return { success: true, message: 'Data imported successfully' };
    } catch (error) {
      console.error('Error importing data:', error);
      throw error;
    }
  },

  /**
   * Export all app data as downloadable JSON file
   * Downloads complete app state including fridge, calendar, grocery list, and settings
   */
  exportAllData: () => {
    try {
      // Collect all localStorage data
      const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        data: {
          fridge: localStorage.getItem('chilifridge_fridge'),
          customRecipes: localStorage.getItem('chilifridge_custom_recipes'),
          calendarData: localStorage.getItem('calendarData'),
          groceryList: localStorage.getItem('groceryList'),
          fridgeCategories: localStorage.getItem('fridgeCategories'),
          fridgeHistory: localStorage.getItem('fridgeHistory'),
          storeSections: localStorage.getItem('storeSections')
        }
      };

      // Convert to JSON string
      const jsonString = JSON.stringify(exportData, null, 2);

      // Create blob and download link
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      // Generate filename with current date
      const date = new Date().toISOString().split('T')[0];
      const filename = `chilifridge-backup-${date}.json`;

      // Create temporary download link and trigger download
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      console.log('Data exported successfully');
      return { success: true, message: 'Data exported successfully' };
    } catch (error) {
      console.error('Error exporting data:', error);
      return { success: false, message: 'Export failed: ' + error.message };
    }
  },

  /**
   * Import app data from a JSON file
   * Restores complete app state from a previously exported file
   * @param {File} file - The JSON file to import
   * @returns {Promise<Object>} - Response message
   */
  importAllData: async (file) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();

        reader.onload = async (e) => {
          try {
            const importData = JSON.parse(e.target.result);

            // Validate the import data structure
            if (!importData.version || !importData.data) {
              throw new Error('Invalid backup file format');
            }

            // Store all data to localStorage
            const data = importData.data;

            if (data.fridge) {
              localStorage.setItem('chilifridge_fridge', data.fridge);
            }
            if (data.customRecipes) {
              localStorage.setItem('chilifridge_custom_recipes', data.customRecipes);
            }
            if (data.calendarData) {
              localStorage.setItem('calendarData', data.calendarData);
            }
            if (data.groceryList) {
              localStorage.setItem('groceryList', data.groceryList);
            }
            if (data.fridgeCategories) {
              localStorage.setItem('fridgeCategories', data.fridgeCategories);
            }
            if (data.fridgeHistory) {
              localStorage.setItem('fridgeHistory', data.fridgeHistory);
            }
            if (data.storeSections) {
              localStorage.setItem('storeSections', data.storeSections);
            }

            console.log('Data imported successfully');
            resolve({
              success: true,
              message: 'Data imported successfully. Refreshing page...',
              exportDate: importData.exportDate
            });
          } catch (parseError) {
            console.error('Error parsing import file:', parseError);
            reject({
              success: false,
              message: 'Invalid file format: ' + parseError.message
            });
          }
        };

        reader.onerror = () => {
          reject({
            success: false,
            message: 'Failed to read file'
          });
        };

        reader.readAsText(file);
      } catch (error) {
        console.error('Error importing data:', error);
        reject({
          success: false,
          message: 'Import failed: ' + error.message
        });
      }
    });
  }
};