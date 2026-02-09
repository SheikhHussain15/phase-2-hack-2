// frontend/src/lib/token_manager.js

/**
 * TokenManager handles JWT token validation and expiry checks
 */
class TokenManager {
  /**
   * Check if the stored token is still valid
   * @returns {boolean} True if token is valid, false otherwise
   */
  static isTokenValid() {
    const token = this.getToken();
    
    if (!token) {
      return false;
    }
    
    try {
      // Decode the token to check its expiry
      const payload = this.decodeToken(token);
      
      if (!payload || !payload.exp) {
        return false;
      }
      
      // Check if the token is expired (comparing with current time in seconds)
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } catch (error) {
      console.error('Error validating token:', error);
      return false;
    }
  }
  
  /**
   * Get the stored token
   * @returns {string|null} The token or null if not found
   */
  static getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  }
  
  /**
   * Set the token in storage
   * @param {string} token - The JWT token to store
   */
  static setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }
  
  /**
   * Remove the token from storage
   */
  static removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }
  
  /**
   * Decode a JWT token (without verification)
   * @param {string} token - The JWT token to decode
   * @returns {Object|null} The decoded payload or null if invalid
   */
  static decodeToken(token) {
    try {
      // Split the token to get the payload part
      const parts = token.split('.');
      
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }
      
      // Decode the payload (second part)
      // Replace '-' with '+' and '_' with '/' for base64 decoding
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      
      // Base64 decode the payload
      const decodedPayload = atob(payload);
      
      // Parse the JSON payload
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  
  /**
   * Get the time remaining until token expiry in seconds
   * @returns {number} Seconds until expiry, or negative if expired
   */
  static getTimeUntilExpiry() {
    const token = this.getToken();
    
    if (!token) {
      return -1;
    }
    
    const payload = this.decodeToken(token);
    
    if (!payload || !payload.exp) {
      return -1;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp - currentTime;
  }
  
  /**
   * Check if the token will expire within the specified time (in seconds)
   * @param {number} seconds - Number of seconds to check
   * @returns {boolean} True if token will expire within the specified time
   */
  static willExpireWithin(seconds) {
    const timeUntilExpiry = this.getTimeUntilExpiry();
    return timeUntilExpiry > 0 && timeUntilExpiry <= seconds;
  }
}

export default TokenManager;