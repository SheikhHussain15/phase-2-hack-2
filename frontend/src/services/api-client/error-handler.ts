// frontend/src/services/api-client/error-handler.ts

export interface ApiErrorHandler {
  handle(error: any): void;
  handleUnauthorized(): void;
  handleNetworkError(): void;
  handleValidationError(errors: any): void;
}

class DefaultApiErrorHandler implements ApiErrorHandler {
  handle(error: any): void {
    if (error.status === 401) {
      this.handleUnauthorized();
    } else if (error.status === 422) {
      this.handleValidationError(error.details);
    } else if (error.status >= 500) {
      console.error('Server error:', error);
      // Show user-friendly server error message
      alert('Server error. Please try again later.');
    } else if (error.status >= 400) {
      console.error('Client error:', error);
      // Show user-friendly client error message
      alert(`Request failed: ${error.message}`);
    } else {
      console.error('Unknown error:', error);
      alert('An unknown error occurred.');
    }
  }

  handleUnauthorized(): void {
    console.warn('Unauthorized access - redirecting to login');
    // In a real app, you would redirect to login page
    // window.location.href = '/login';
  }

  handleNetworkError(): void {
    console.error('Network error');
    alert('Network error. Please check your connection.');
  }

  handleValidationError(errors: any): void {
    console.error('Validation error:', errors);
    // Handle validation errors appropriately
    if (errors && typeof errors === 'object') {
      Object.entries(errors).forEach(([field, messages]) => {
        console.error(`${field}:`, messages);
      });
    }
    alert('Validation error. Please check your input.');
  }
}

export const apiErrorHandler = new DefaultApiErrorHandler();