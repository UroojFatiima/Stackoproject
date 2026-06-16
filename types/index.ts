export type Screen = 'dashboard' | 'accounts' | 'cards' | 'transfers' | 'profile'

export interface Transaction {
  id: string
  title: string
  category: string
  amount: number
  date: string
  type: 'credit' | 'debit'
  icon: string
}

export interface Account {
  id: string
  name: string
  number: string
  balance: number
  currency: string
  type: 'savings' | 'current'
}

export interface QuickAction {
  id: string
  label: string
  icon: string
}

export interface OnboardingDetails {
  fullName: string
  email: string
  phone: string
  nationalId: string
  dateOfBirth: string
  country: string
  city: string
  address: string
  accountNumber: string
}

export interface UserProfile {
  id: string
  email: string
  password: string
  name: string
  avatar: string
  onboardingCompleted: boolean
  bonusActivated: boolean
  onboardingDetails?: OnboardingDetails
  createdAt: string
}

export interface AuthSession {
  userId: string
  isNewSignup: boolean
}
