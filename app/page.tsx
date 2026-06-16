'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { WelcomeSlideshow } from '@/components/WelcomeSlideshow'
import { useAuth } from '@/lib/auth-context'
import { getSession } from '@/lib/user-storage'

export default function HomePage() {
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && user && getSession()) {
      router.replace(user.onboardingCompleted ? '/dashboard' : '/onboarding')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stacko-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
      </div>
    )
  }

  if (user && getSession()) {
    return null
  }

  return <WelcomeSlideshow />
}
