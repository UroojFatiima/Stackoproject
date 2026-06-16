'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar'
import { BottomNav } from '@/components/BottomNav'
import { useAuth, useRequireAuth } from '@/lib/auth-context'
import { getSession } from '@/lib/user-storage'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, signOut } = useAuth()
  const router = useRouter()
  useRequireAuth()

  useEffect(() => {
    if (!isLoading && user && !user.onboardingCompleted) {
      router.replace('/onboarding')
    }
  }, [user, isLoading, router])

  if (isLoading || !user || !getSession()) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stacko-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-stacko-red border-t-transparent" />
      </div>
    )
  }

  if (!user.onboardingCompleted) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-stacko-cream">
      <Sidebar onLogout={signOut} />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-5xl px-4 py-6 md:px-8 md:py-8">{children}</div>
      </main>
      <BottomNav />
    </div>
  )
}
