// frontend/src/services/auth/logout.ts

import { authService } from './authService';
import { sessionManager } from './session';

export const logout = async (): Promise<void> => {
  try {
    // Perform any server-side logout if needed
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
    await fetch(`${baseUrl}/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authService.getToken()}`,
        'Content-Type': 'application/json',
      },
    });

    // Clear local session
    authService.logout();
    sessionManager.clear();
  } catch (error) {
    console.error('Logout error:', error);
    // Even if server logout fails, clear local session
    authService.logout();
    sessionManager.clear();
  }
};