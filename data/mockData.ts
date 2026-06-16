import type { QuickAction, Transaction } from '@/types'

export const bonusTransaction: Transaction = {
  id: 'bonus-500',
  title: '500 AED investment bonus credited to your app account.',
  category: 'Investment Bonus',
  amount: 500,
  date: 'Just now',
  type: 'credit',
  icon: 'investment',
}

export const quickActions: QuickAction[] = [
  { id: 'transfer', label: 'Transfer', icon: 'transfer' },
  { id: 'pay', label: 'Pay Bills', icon: 'pay' },
  { id: 'cards', label: 'Cards', icon: 'cards' },
  { id: 'invest', label: 'Invest', icon: 'invest' },
  { id: 'loan', label: 'Loans', icon: 'loan' },
  { id: 'more', label: 'More', icon: 'more' },
]

export const INVESTMENT_BONUS_AMOUNT = 500
