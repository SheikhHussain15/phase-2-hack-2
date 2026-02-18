'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import apiClient from '@/utils/api'
import { Container, Card, Input, Button } from '@components/ui'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/dashboard')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const { access_token } = response.data
      localStorage.setItem('token', access_token)

      // Redirect to dashboard after successful login
      router.push('/dashboard')
    } catch (err: any) {
      const errorData = err.response?.data
      let errorMessage = 'Login failed'

      if (errorData?.message) {
        errorMessage = errorData.message
      } else if (Array.isArray(errorData?.detail)) {
        // Handle Pydantic validation errors
        errorMessage = errorData.detail.map((e: any) => e.msg || e.message).join(', ')
      } else if (errorData?.detail) {
        errorMessage = typeof errorData.detail === 'string' ? errorData.detail : 'Login failed'
      }

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Container size="sm" centered>
        <Card padding="lg" shadow="lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Sign in to your account
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="rounded-md bg-error-50 p-4" role="alert">
                <p className="text-sm text-error-700">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <Input
              id="email"
              label="Email address"
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password Field */}
            <Input
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  )
}
