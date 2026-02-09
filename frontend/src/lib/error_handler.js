// frontend/src/lib/error_handler.js

/**
 * Handle API errors, particularly authentication and authorization errors
 */
export const handleApiError = (error, onErrorCallback) => {
  // Check if it's a 401 Unauthorized error
  if (error.message && error.message.includes('401')) {
    // Clear the auth token as it might be expired or invalid
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
    
    // Optionally redirect to login page
    // window.location.href = '/login';
    
    if (onErrorCallback) {
      onErrorCallback({
        type: 'UNAUTHORIZED',
        message: 'Session expired. Please log in again.',
        originalError: error
      });
    }
    
    return;
  }
  
  // Check if it's a 403 Forbidden error
  if (error.message && error.message.includes('403')) {
    if (onErrorCallback) {
      onErrorCallback({
        type: 'FORBIDDEN',
        message: 'Access denied. You do not have permission to perform this action.',
        originalError: error
      });
    }
    
    return;
  }
  
  // For other errors, pass them through
  if (onErrorCallback) {
    onErrorCallback({
      type: 'GENERAL',
      message: error.message || 'An unexpected error occurred',
      originalError: error
    });
  }
};

/**
 * A wrapper for API calls that automatically handles common errors
 */
export const withErrorHandling = async (apiCall, onErrorCallback) => {
  try {
    const result = await apiCall();
    return result;
  } catch (error) {
    handleApiError(error, onErrorCallback);
    throw error; // Re-throw so the calling code can handle it as needed
  }
};