'use client'

import { Plus, Wallet, TrendingUp } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { getUserAccounts, getPortfolioBalance } from '@/lib/user-data'
import { INVESTMENT_BONUS_AMOUNT } from '@/data/mockData'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function AccountsPage() {
  const { user } = useAuth()
  if (!user) return null

  const accounts = getUserAccounts(user)
  const portfolio = getPortfolioBalance(user)
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div>
        <h1 className="text-2xl font-bold text-stacko-black">My Accounts</h1>
        <p className="text-sm text-stacko-gray">View and manage your RAK Bank Investment accounts</p>
      </div>

      <div className="bento-card gradient-red text-white">
        <p className="text-sm text-white/70">Total balance</p>
        <p className="mt-1 text-3xl font-bold">
          AED {totalBalance.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="space-y-3">
        {accounts.map((account) => (
          <div key={account.id} className="bento-card flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stacko-red/10 text-stacko-red">
              <Wallet size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-stacko-black">{account.name}</p>
              <p className="text-xs text-stacko-gray">{account.number}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-stacko-black">
                {account.currency}{' '}
                {account.balance.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </p>
              <p className="text-xs capitalize text-emerald-600">{account.type}</p>
            </div>
          </div>
        ))}

        {portfolio === 0 && (
          <div className="bento-card border border-dashed border-gray-200 py-8 text-center">
            <TrendingUp size={28} className="mx-auto mb-2 text-stacko-gray" />
            <p className="text-sm font-medium text-stacko-gray-dark">No active investment account</p>
            <p className="mt-1 text-xs text-stacko-gray">
              Complete onboarding to activate your account and receive AED {INVESTMENT_BONUS_AMOUNT}{' '}
              bonus
            </p>
            <Link href="/onboarding" className="mt-3 inline-block text-sm font-semibold text-stacko-red">
              Complete profile →
            </Link>
          </div>
        )}
      </div>

      <Button fullWidth variant="outline">
        <span className="inline-flex items-center gap-2">
          <Plus size={18} />
          Open new account
        </span>
      </Button>
    </div>
  )
}
