/**
 * API module for handling server requests
 */
const API = {
  /**
   * Fetch fridge data from the server
   * @returns {Promise<Object>} - Fridge data
   */
  fetchFridge: async () => {
    try {
      const response = await fetch('/api/fridge');
      if (!response.ok) {
        throw new Error('Failed to fetch fridge data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching fridge data:', error);
      throw error;
    }
  },

  /**
   * Update fridge data on the server
   * @param {Object} fridgeData - Updated fridge data
   * @returns {Promise<Object>} - Response message
   */
  updateFridge: async (fridgeData) => {
    try {
      // Make sure we have valid data to send
      if (!fridgeData || typeof fridgeData !== 'object') {
        console.error('Invalid fridge data for update:', fridgeData);
        throw new Error('Invalid fridge data');
      }
      
      console.log('Sending fridge update to server...');
      
      const response = await fetch('/api/fridge/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fridgeData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('Server error updating fridge:', response.status, errorData);
        throw new Error(`Failed to update fridge data: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('Fridge update successful:', result);
      return result;
    } catch (error) {
      console.error('Error updating fridge data:', error);
      throw error;
    }
  },

  /**
   * Fetch recipe data from the server
   * @returns {Promise<Object>} - Recipe data
   */
  fetchRecipes: async () => {
    try {
      const response = await fetch('/api/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },

  /**
   * Fetch a specific recipe by name
   * @param {string} name - Recipe name
   * @returns {Promise<Array>} - Recipe ingredients
   */
  fetchRecipeByName: async (name) => {
    try {
      const response = await fetch(`/api/recipes/${encodeURIComponent(name)}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error('Failed to fetch recipe');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipe:', error);
      throw error;
    }
  }
}; 