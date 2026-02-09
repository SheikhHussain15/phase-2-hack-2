// frontend/src/app/(auth)/login/page.tsx

'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { sessionManager } from '@/services/auth/session';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const session = await sessionManager.initialize();
      if (session.isAuthenticated) {
        // If already logged in, redirect to tasks page
        router.push('/tasks');
      }
    };

    checkAuth();
  }, [router]);

  const handleLoginSuccess = (userData: any) => {
    // Redirect to tasks page after successful login
    // If there's a saved redirect path, use that instead
    const redirectPath = sessionManager.getRedirectAfterLogin();
    router.push(redirectPath || '/tasks');
  };

  const handleLoginError = (error: string) => {
    console.error('Login error:', error);
    // Error handling is done within the form component
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <main className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>
        
        <LoginForm 
          onSuccess={handleLoginSuccess} 
          onError={handleLoginError} 
        />
      </main>
    </div>
  );
}