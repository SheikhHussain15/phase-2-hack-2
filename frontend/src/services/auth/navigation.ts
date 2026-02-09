// frontend/src/services/auth/navigation.ts

export class NavigationService {
  private static readonly REDIRECT_KEY = 'redirectAfterLogin';

  /**
   * Save the current route to redirect to after login
   */
  static saveRedirectPath(path: string): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(this.REDIRECT_KEY, path);
    }
  }

  /**
   * Get the saved redirect path and remove it from storage
   */
  static getAndClearRedirectPath(): string | null {
    if (typeof window !== 'undefined') {
      const path = sessionStorage.getItem(this.REDIRECT_KEY);
      sessionStorage.removeItem(this.REDIRECT_KEY); // Clear after retrieval
      return path;
    }
    return null;
  }

  /**
   * Check if there's a saved redirect path
   */
  static hasRedirectPath(): boolean {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem(this.REDIRECT_KEY) !== null;
    }
    return false;
  }

  /**
   * Redirect to the saved path or fallback
   */
  static redirectToSavedPath(fallbackPath: string = '/tasks'): void {
    const savedPath = this.getAndClearRedirectPath();
    const targetPath = savedPath || fallbackPath;
    
    if (typeof window !== 'undefined') {
      window.location.href = targetPath;
    }
  }

  /**
   * Navigate to a specific route
   */
  static navigateTo(path: string): void {
    if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  }

  /**
   * Go back to the previous page in history
   */
  static goBack(): void {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  }

  /**
   * Reload the current page
   */
  static reload(): void {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  }
}