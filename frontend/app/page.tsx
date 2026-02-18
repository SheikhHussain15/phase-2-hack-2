import Link from 'next/link'
import { Container, Button } from '@components/ui'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container size="md" centered>
        <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg sm:px-10">
          <div className="text-center">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Todo App
            </h1>
            <p className="text-base text-gray-600 mb-8">
              Manage your tasks efficiently with our secure platform
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href="/login" className="block">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                >
                  Sign In
                </Button>
              </Link>

              <Link href="/signup" className="block">
                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                >
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}