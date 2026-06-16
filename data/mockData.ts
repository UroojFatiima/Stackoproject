import type { QuickAction, Transaction } from '@/types'

export const defaultUser = {
  name: 'Ahmed Al Mansouri',
  greeting: 'Good morning',
  avatar: 'AM',
}

export const accounts = [
  {
    id: '1',
    name: 'Current Account',
    number: '**** 4829',
    balance: 128450.75,
    currency: 'AED',
    type: 'current' as const,
  },
  {
    id: '2',
    name: 'Savings Account',
    number: '**** 7103',
    balance: 45200.0,
    currency: 'AED',
    type: 'savings' as const,
  },
]

export const baseTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Salary Deposit',
    category: 'Income',
    amount: 18500,
    date: 'Today, 9:00 AM',
    type: 'credit',
    icon: 'salary',
  },
  {
    id: '2',
    title: 'Carrefour UAE',
    category: 'Shopping',
    amount: 342.5,
    date: 'Yesterday',
    type: 'debit',
    icon: 'shopping',
  },
  {
    id: '3',
    title: 'DEWA Bill Payment',
    category: 'Utilities',
    amount: 485.0,
    date: 'Jun 14',
    type: 'debit',
    icon: 'utilities',
  },
  {
    id: '4',
    title: 'Transfer to Sara',
    category: 'Transfer',
    amount: 2000,
    date: 'Jun 13',
    type: 'debit',
    icon: 'transfer',
  },
  {
    id: '5',
    title: 'Investment Return',
    category: 'Investment',
    amount: 1250.25,
    date: 'Jun 12',
    type: 'credit',
    icon: 'investment',
  },
]

export const bonusTransaction: Transaction = {
  id: 'bonus-500',
  title: '500 AED investment bonus credited to your app account.',
  category: 'Bonus',
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
