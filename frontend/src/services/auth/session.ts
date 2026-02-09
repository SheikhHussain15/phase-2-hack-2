// frontend/src/services/auth/session.ts

import { User, authService } from './authService';

export interface Session {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class SessionManager {
  private callbacks: Array<(session: Session) => void> = [];

  constructor() {
    // Listen to storage events to sync session across tabs
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageChange);
    }
  }

  // Subscribe to session changes
  subscribe(callback: (session: Session) => void): () => void {
    this.callbacks.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  // Notify all subscribers of session change
  private notify() {
    const session = this.getSession();
    this.callbacks.forEach(callback => callback(session));
  }

  // Get current session
  getSession(): Session {
    const isAuthenticated = authService.isAuthenticated();
    let user = null;

    if (isAuthenticated) {
      user = authService.getUser();
    }

    return {
      user,
      isAuthenticated,
      isLoading: false, // We're not doing async loading here, but a real implementation might
    };
  }

  // Handle storage changes (for tab synchronization)
  private handleStorageChange = (e: StorageEvent) => {
    if (e.key === authService['TOKEN_KEY'] || e.key === authService['USER_KEY']) {
      this.notify();
    }
  };

  // Initialize session from storage
  async initialize(): Promise<Session> {
    // In a real implementation, you might want to validate the token with the server
    // For now, we just return the current session
    return this.getSession();
  }

  // Refresh session (e.g., after token refresh)
  refresh() {
    this.notify();
  }

  // Get redirect path after login
  getRedirectAfterLogin(): string | null {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('redirectAfterLogin');
    }
    return null;
  }

  // Clear session
  clear() {
    authService.logout();
    this.notify();
  }
}

export const sessionManager = new SessionManager();