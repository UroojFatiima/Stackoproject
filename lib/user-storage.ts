import type { UserProfile } from '@/types'

const USERS_KEY = 'rakbank_users'
const SESSION_KEY = 'rakbank_session'

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getStoredUsers(): UserProfile[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? (JSON.parse(raw) as UserProfile[]) : []
  } catch {
    return []
  }
}

function saveUsers(users: UserProfile[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function findUserByEmail(email: string): UserProfile | undefined {
  return getStoredUsers().find((user) => user.email.toLowerCase() === email.toLowerCase())
}

export function registerUser(email: string, password: string): UserProfile {
  const users = getStoredUsers()
  const existing = findUserByEmail(email)
  if (existing) {
    throw new Error('An account with this email already exists.')
  }

  const user: UserProfile = {
    id: crypto.randomUUID(),
    email: email.toLowerCase(),
    password,
    name: email.split('@')[0],
    avatar: getInitials(email.split('@')[0]),
    onboardingCompleted: false,
    bonusActivated: false,
    createdAt: new Date().toISOString(),
  }

  users.push(user)
  saveUsers(users)
  return user
}

export function authenticateUser(email: string, password: string): UserProfile {
  const user = findUserByEmail(email)
  if (!user || user.password !== password) {
    throw new Error('Invalid email or password.')
  }
  return user
}

export function updateUser(updated: UserProfile): UserProfile {
  const users = getStoredUsers()
  const index = users.findIndex((user) => user.id === updated.id)
  if (index === -1) throw new Error('User not found.')
  users[index] = updated
  saveUsers(users)
  return updated
}

export function getSession(): { userId: string; isNewSignup: boolean } | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setSession(userId: string, isNewSignup: boolean): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ userId, isNewSignup }))
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

export function getCurrentUser(): UserProfile | null {
  const session = getSession()
  if (!session) return null
  return getStoredUsers().find((user) => user.id === session.userId) ?? null
}

export function completeOnboarding(
  userId: string,
  details: UserProfile['onboardingDetails'],
): UserProfile {
  const user = getStoredUsers().find((entry) => entry.id === userId)
  if (!user) throw new Error('User not found.')

  const updated: UserProfile = {
    ...user,
    name: details?.fullName ?? user.name,
    avatar: getInitials(details?.fullName ?? user.name),
    onboardingCompleted: true,
    bonusActivated: true,
    onboardingDetails: details,
  }

  return updateUser(updated)
}
