'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import type { UserProfile } from '@/types'
import {
  authenticateUser,
  clearSession,
  getCurrentUser,
  getSession,
  registerUser,
  setSession,
} from '@/lib/user-storage'

interface AuthContextValue {
  user: UserProfile | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

async function notifyAuth(type: 'signup' | 'signin', email: string) {
  try {
    await fetch('/api/auth/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, email }),
    })
  } catch {
    // Non-blocking notification
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(() => {
    setUser(getCurrentUser())
  }, [])

  useEffect(() => {
    refreshUser()
    setIsLoading(false)
  }, [refreshUser])

  const signIn = useCallback(
    async (email: string, password: string) => {
      const authenticated = authenticateUser(email, password)
      setSession(authenticated.id, false)
      setUser(authenticated)
      await notifyAuth('signin', email)

      if (!authenticated.onboardingCompleted) {
        router.push('/onboarding')
        return
      }

      router.push('/dashboard')
    },
    [router],
  )

  const signUp = useCallback(
    async (email: string, password: string) => {
      const created = registerUser(email, password)
      setSession(created.id, true)
      setUser(created)
      await notifyAuth('signup', email)
      router.push('/onboarding')
    },
    [router],
  )

  const signOut = useCallback(() => {
    clearSession()
    setUser(null)
    router.push('/login')
  }, [router])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signIn,
      signUp,
      signOut,
      refreshUser,
    }),
    [user, isLoading, signIn, signUp, signOut, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function useRequireAuth(redirectTo = '/login') {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user && !getSession()) {
      router.replace(redirectTo)
    }
  }, [user, isLoading, router, redirectTo])

  return { user, isLoading }
}
