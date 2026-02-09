// frontend/src/lib/api_client.js

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  // Helper method to get the stored JWT token
  getAuthToken() {
    // In a real app, this might come from a global state, context, or secure storage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  // Method to set the auth token
  setAuthToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  // Method to remove the auth token
  removeAuthToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  // Generic request method that adds the JWT token to the Authorization header
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const authToken = this.getAuthToken();

    const config = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    };

    // Add Authorization header if token exists
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
      const response = await fetch(url, config);

      // If response is 401, remove the token and redirect to login
      if (response.status === 401) {
        this.removeAuthToken();
        // In a real app, you might want to redirect to login page
        // window.location.href = '/login';
        throw new Error('Unauthorized: Please log in again');
      }

      // Attempt to parse JSON response
      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Specific methods for common operations
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Create a singleton instance
const apiClient = new ApiClient(process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000');

export default apiClient;
export { ApiClient };