// frontend/src/hooks/useAuthRedirect.ts

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sessionManager } from '@/services/auth/session';

export function useAuthRedirect(protectedRoute: boolean = true, redirectTo: string = '/login') {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuthAndRedirect = async () => {
      const session = await sessionManager.initialize();
      
      if (protectedRoute) {
        // This is a protected route - user must be authenticated
        if (session.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          // Save the current path for redirect after login
          if (typeof window !== 'undefined') {
            sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
          }
          router.push(redirectTo);
          setIsAuthenticated(false);
        }
      } else {
        // This is a public route - redirect authenticated users away
        if (session.isAuthenticated) {
          // Authenticated users shouldn't be on public routes like login/signup
          router.push('/tasks'); // Redirect to default protected route
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      }
    };

    checkAuthAndRedirect();
  }, [protectedRoute, redirectTo, router]);

  return { isAuthenticated };
}