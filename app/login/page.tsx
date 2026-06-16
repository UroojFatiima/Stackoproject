'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fingerprint, Lock, Mail } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/Button'
import { useAuth } from '@/lib/auth-context'
import { getSession } from '@/lib/user-storage'
import { brand } from '@/config/brand'

export default function LoginPage() {
  const router = useRouter()
  const { signIn, user, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
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
    setSubmitting(true)
    try {
      await signIn(email, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleBiometric = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password before using biometrics.')
      return
    }
    setError('')
    setSubmitting(true)
    try {
      await signIn(email, password, 'biometric')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed.')
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
          <Logo size="xl" variant="light" />
        </div>

        <div className="relative space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Banking reimagined
            <br />
            for the modern investor.
          </h1>
          <p className="max-w-md text-lg text-white/70">
            Manage your accounts, invest smarter, and take control of your financial future — all in
            one place.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { value: '500K+', label: 'Active Users' },
              { value: 'AED 2B+', label: 'Assets Managed' },
              { value: '99.9%', label: 'Uptime' },
              { value: '4.8★', label: 'App Rating' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-white/40">{brand.copyright}</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo size="xl" />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-stacko-black">Welcome back</h2>
            <p className="mt-1 text-stacko-gray">Sign in to your {brand.name} account</p>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                Email or Customer ID
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-stacko-gray"
                />
                <input
                  type="text"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-stacko-black outline-none transition-all focus:border-stacko-red focus:ring-2 focus:ring-stacko-red/20"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-stacko-gray-dark">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-stacko-red focus:ring-stacko-red"
                />
                Remember me
              </label>
              <button type="button" className="text-sm font-medium text-stacko-red hover:underline">
                Forgot password?
              </button>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={submitting}>
              {submitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-stacko-cream px-4 text-stacko-gray">or continue with</span>
            </div>
          </div>

          <button
            onClick={handleBiometric}
            disabled={submitting}
            className="flex w-full items-center justify-center gap-3 rounded-xl border-2 border-gray-200 bg-white py-3.5 font-medium text-stacko-gray-dark transition-all hover:border-stacko-red hover:text-stacko-red disabled:opacity-50"
          >
            <Fingerprint size={22} className="text-stacko-red" />
            Sign in with Biometrics
          </button>

          <p className="mt-8 text-center text-sm text-stacko-gray">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-stacko-red hover:underline">
              Open an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
