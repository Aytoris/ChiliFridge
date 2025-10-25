/**
 * Utility module for common functions
 */
const Utility = (() => {
  /**
   * Show a toast notification
   * @param {string} message - Message to display
   * @param {string} type - Notification type: 'info', 'success', 'warning', 'error'
   */
  const showToast = (message, type = 'info') => {
    const toastContainer = document.getElementById('toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Remove toast after animation completes (3 seconds)
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };
  
  // Public API
  return {
    showToast
  };
})(); 