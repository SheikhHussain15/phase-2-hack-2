import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      <main className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Todo App</h1>
          <p className="text-lg text-gray-600 mb-8">
            A secure, multi-user task management application
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-full sm:w-auto">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}