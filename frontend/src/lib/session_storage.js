// frontend/src/lib/session_storage.js

/**
 * SessionStorage handles storing and retrieving session-related data
 * This includes user preferences, temporary data, etc.
 */
class SessionStorage {
  /**
   * Store data in session storage
   * @param {string} key - The key to store the data under
   * @param {any} value - The value to store (will be JSON.stringified)
   */
  static set(key, value) {
    if (typeof window !== 'undefined') {
      try {
        const serializedValue = JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
      } catch (error) {
        console.error(`Error storing value for key "${key}":`, error);
      }
    }
  }
  
  /**
   * Retrieve data from session storage
   * @param {string} key - The key to retrieve the data from
   * @param {any} defaultValue - The default value to return if key doesn't exist
   * @returns {any} The stored value or defaultValue
   */
  static get(key, defaultValue = null) {
    if (typeof window !== 'undefined') {
      try {
        const serializedValue = sessionStorage.getItem(key);
        return serializedValue === null ? defaultValue : JSON.parse(serializedValue);
      } catch (error) {
        console.error(`Error retrieving value for key "${key}":`, error);
        return defaultValue;
      }
    }
    return defaultValue;
  }
  
  /**
   * Remove data from session storage
   * @param {string} key - The key to remove
   */
  static remove(key) {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {
        console.error(`Error removing key "${key}":`, error);
      }
    }
  }
  
  /**
   * Clear all session storage
   */
  static clear() {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.clear();
      } catch (error) {
        console.error('Error clearing session storage:', error);
      }
    }
  }
  
  /**
   * Store user preferences
   * @param {Object} preferences - The user preferences to store
   */
  static setUserPreferences(preferences) {
    this.set('user_preferences', preferences);
  }
  
  /**
   * Get user preferences
   * @returns {Object} The user preferences or default values
   */
  static getUserPreferences() {
    return this.get('user_preferences', {});
  }
  
  /**
   * Store temporary form data
   * @param {string} formId - The ID of the form
   * @param {Object} formData - The form data to store
   */
  static setFormData(formId, formData) {
    const key = `form_data_${formId}`;
    this.set(key, formData);
  }
  
  /**
   * Get temporary form data
   * @param {string} formId - The ID of the form
   * @returns {Object} The form data or null
   */
  static getFormData(formId) {
    const key = `form_data_${formId}`;
    return this.get(key, null);
  }
  
  /**
   * Store navigation state
   * @param {Object} navState - The navigation state to store
   */
  static setNavigationState(navState) {
    this.set('navigation_state', navState);
  }
  
  /**
   * Get navigation state
   * @returns {Object} The navigation state or default values
   */
  static getNavigationState() {
    return this.get('navigation_state', {});
  }
}

export default SessionStorage;