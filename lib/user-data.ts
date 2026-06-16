import type { UserProfile, Account, Transaction } from '@/types'
import { INVESTMENT_BONUS_AMOUNT } from '@/data/mockData'

export function getUserAccounts(user: UserProfile): Account[] {
  const lastFour = user.onboardingDetails?.accountNumber?.slice(-4) ?? '----'
  const balance = user.bonusActivated ? INVESTMENT_BONUS_AMOUNT : 0

  return [
    {
      id: 'investment',
      name: 'Investment Account',
      number: `**** ${lastFour}`,
      balance,
      currency: 'AED',
      type: 'savings',
    },
  ]
}

export function getUserTransactions(user: UserProfile): Transaction[] {
  if (!user.bonusActivated) return []

  return [
    {
      id: 'bonus-500',
      title: '500 AED investment bonus credited to your app account.',
      category: 'Investment Bonus',
      amount: INVESTMENT_BONUS_AMOUNT,
      date: 'Just now',
      type: 'credit',
      icon: 'investment',
    },
  ]
}

export function getPortfolioBalance(user: UserProfile): number {
  return user.bonusActivated ? INVESTMENT_BONUS_AMOUNT : 0
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}
