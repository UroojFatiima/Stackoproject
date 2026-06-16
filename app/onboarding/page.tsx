'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, UserCircle2 } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { Button } from '@/components/Button'
import { useAuth, useRequireAuth } from '@/lib/auth-context'
import { completeOnboarding } from '@/lib/user-storage'
import type { OnboardingDetails } from '@/types'

const inputClassName =
  'w-full rounded-xl border border-gray-200 bg-white py-3.5 px-4 text-stacko-black outline-none transition-all focus:border-stacko-red focus:ring-2 focus:ring-stacko-red/20'

const initialForm: OnboardingDetails = {
  fullName: '',
  email: '',
  phone: '',
  nationalId: '',
  dateOfBirth: '',
  country: '',
  city: '',
  address: '',
  accountNumber: '',
}

export default function OnboardingPage() {
  const router = useRouter()
  const { user, isLoading, refreshUser } = useAuth()
  useRequireAuth()
  const [form, setForm] = useState<OnboardingDetails>(initialForm)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (!isLoading && user?.onboardingCompleted) {
      router.replace('/dashboard')
    }
  }, [user, isLoading, router])

  useEffect(() => {
    if (user?.email) {
      setForm((prev) => ({ ...prev, email: user.email }))
    }
  }, [user])

  const updateField = (field: keyof OnboardingDetails, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      if (!user) throw new Error('Not authenticated.')

      const response = await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error ?? 'Failed to submit onboarding.')
      }

      completeOnboarding(user.id, form)
      refreshUser()
      setShowSuccess(true)

      setTimeout(() => {
        router.push('/dashboard')
      }, 2500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stacko-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-stacko-red border-t-transparent" />
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-stacko-cream px-6">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={36} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-stacko-black">Profile completed!</h2>
          <p className="mb-4 text-stacko-gray">
            Your account details have been submitted successfully.
          </p>
          <div className="rounded-2xl bg-emerald-50 p-4">
            <p className="font-semibold text-emerald-700">500 AED investment bonus credited</p>
            <p className="mt-1 text-sm text-emerald-600">Redirecting to your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stacko-cream px-4 py-8 md:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <Logo size="md" />
        </div>

        <div className="bento-card">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stacko-red/10 text-stacko-red">
              <UserCircle2 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stacko-black md:text-2xl">
                Complete your profile
              </h1>
              <p className="text-sm text-stacko-gray">
                Tell us a bit about yourself to activate your 500 AED investment bonus
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                  Full name
                </label>
                <input
                  required
                  type="text"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Enter your email"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                  Phone number
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+971 50 000 0000"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                  Emirates ID / National ID
                </label>
                <input
                  required
                  type="text"
                  value={form.nationalId}
                  onChange={(e) => updateField('nationalId', e.target.value)}
                  placeholder="784-XXXX-XXXXXXX-X"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                  Date of birth
                </label>
                <input
                  required
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                  Country
                </label>
                <input
                  required
                  type="text"
                  value={form.country}
                  onChange={(e) => updateField('country', e.target.value)}
                  placeholder="United Arab Emirates"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                  City
                </label>
                <input
                  required
                  type="text"
                  value={form.city}
                  onChange={(e) => updateField('city', e.target.value)}
                  placeholder="Dubai"
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                  Address
                </label>
                <input
                  required
                  type="text"
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  placeholder="Street, building, apartment"
                  className={inputClassName}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
                  Account number
                </label>
                <input
                  required
                  type="text"
                  value={form.accountNumber}
                  onChange={(e) => updateField('accountNumber', e.target.value)}
                  placeholder="Enter your account number"
                  className={inputClassName}
                />
              </div>
            </div>

            <Button type="submit" fullWidth size="lg" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
