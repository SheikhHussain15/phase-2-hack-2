// frontend/src/components/common/ProtectedRoute.tsx

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sessionManager } from '@/services/auth/session';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({ 
  children, 
  fallback = <div>Loading...</div>, 
  redirectTo = '/login' 
}: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const session = await sessionManager.initialize();
      if (session.isAuthenticated) {
        setIsAuthorized(true);
      } else {
        // Save the current path for redirect after login
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
        }
        setIsAuthorized(false);
        router.push(redirectTo);
      }
    };

    checkAuth();
  }, [router, redirectTo]);

  if (isAuthorized === null) {
    // Still checking auth status
    return fallback;
  }

  if (!isAuthorized) {
    // Redirect is happening, show nothing or a loading indicator
    return fallback;
  }

  // User is authorized, render children
  return <>{children}</>;
}