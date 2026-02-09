// frontend/src/services/middleware/route-guard.ts

import { authService } from '../auth/authService';

export interface RouteGuardOptions {
  redirectTo?: string;
  preserveRedirect?: boolean;
}

export class RouteGuard {
  // Check if a route requires authentication
  static requiresAuth(pathname: string): boolean {
    // Define protected routes here
    const protectedRoutes = [
      '/tasks',
      '/profile',
      '/settings',
      // Add more protected routes as needed
    ];

    // Check if the current path matches any protected route
    return protectedRoutes.some(route => 
      pathname === route || pathname.startsWith(route + '/')
    );
  }

  // Guard a route - returns true if access is allowed
  static async canActivate(pathname: string, options: RouteGuardOptions = {}): Promise<boolean> {
    const { redirectTo = '/login', preserveRedirect = true } = options;

    // If the route doesn't require authentication, allow access
    if (!this.requiresAuth(pathname)) {
      return true;
    }

    // Check if user is authenticated
    const isAuthenticated = authService.isAuthenticated();

    if (!isAuthenticated) {
      // Save the attempted route for redirect after login
      if (preserveRedirect && typeof window !== 'undefined') {
        sessionStorage.setItem('redirectAfterLogin', pathname + window.location.search);
      }

      // Redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = redirectTo;
      }
      return false;
    }

    // User is authenticated, allow access
    return true;
  }

  // Get the redirect path after login
  static getRedirectAfterLogin(): string | null {
    if (typeof window !== 'undefined') {
      const redirectPath = sessionStorage.getItem('redirectAfterLogin');
      sessionStorage.removeItem('redirectAfterLogin'); // Clean up after retrieval
      return redirectPath;
    }
    return null;
  }

  // Protect a route with a callback
  static async protectRoute(
    pathname: string, 
    onAuthorized: () => void, 
    onUnauthorized: (redirectTo: string) => void,
    options: RouteGuardOptions = {}
  ): Promise<void> {
    const { redirectTo = '/login' } = options;
    
    const canAccess = await this.canActivate(pathname, options);
    
    if (canAccess) {
      onAuthorized();
    } else {
      onUnauthorized(redirectTo);
    }
  }
}