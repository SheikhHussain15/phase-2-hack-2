// frontend/src/app/(auth)/signup/page.tsx

'use client';

import { SignupForm } from '@/components/auth/SignupForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { sessionManager } from '@/services/auth/session';

export default function SignupPage() {
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

  const handleSignupSuccess = (userData: any) => {
    // Redirect to tasks page after successful signup
    router.push('/tasks');
  };

  const handleSignupError = (error: string) => {
    console.error('Signup error:', error);
    // Error handling is done within the form component
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <main className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Join us to manage your tasks</p>
        </div>
        
        <SignupForm 
          onSuccess={handleSignupSuccess} 
          onError={handleSignupError} 
        />
      </main>
    </div>
  );
}