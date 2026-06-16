'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Lock, Mail, UserPlus } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/Button'
import { useAuth } from '@/lib/auth-context'
import { getSession } from '@/lib/user-storage'
import { brand } from '@/config/brand'

export default function SignUpPage() {
  const router = useRouter()
  const { signUp, user, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!isLoading && user && getSession()) {
      router.replace(user.onboardingCompleted ? '/dashboard' : '/onboarding')
    }
  }, [user, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      await signUp(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="gradient-red relative hidden w-1/2 flex-col justify-between overflow-hidden p-12 text-white lg:flex">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-white/5" />

        <div className="relative">
          <Logo size="lg" variant="light" />
        </div>

        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Start your journey
            <br />
            with {brand.name} today.
          </h1>
          <p className="max-w-md text-lg text-white/70">
            Open your account in minutes and get a 500 AED investment bonus after completing your
            profile.
          </p>
        </div>

        <p className="relative text-sm text-white/40">{brand.copyright}</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo size="lg" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-stacko-black">Create your account</h2>
            <p className="mt-1 text-stacko-gray">Sign up to get started with {brand.name}</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                Email address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stacko-gray"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-stacko-black outline-none transition-all focus:border-stacko-red focus:ring-2 focus:ring-stacko-red/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stacko-gray"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-stacko-black outline-none transition-all focus:border-stacko-red focus:ring-2 focus:ring-stacko-red/20"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                Confirm password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stacko-gray"
                />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-stacko-black outline-none transition-all focus:border-stacko-red focus:ring-2 focus:ring-stacko-red/20"
                />
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={submitting}>
              <span className="inline-flex items-center gap-2">
                <UserPlus size={20} />
                {submitting ? 'Creating account...' : 'Sign Up'}
              </span>
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-stacko-gray">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-stacko-red hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
