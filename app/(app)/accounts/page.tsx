'use client'

import { Plus, Wallet, PiggyBank, TrendingUp } from 'lucide-react'
import { accounts } from '@/data/mockData'
import { Button } from '@/components/Button'

const typeIcons = {
  current: Wallet,
  savings: PiggyBank,
}

export default function AccountsPage() {
  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div>
        <h1 className="text-2xl font-bold text-stacko-black">My Accounts</h1>
        <p className="text-sm text-stacko-gray">View and manage all your Stacko accounts</p>
      </div>

      <div className="bento-card gradient-red text-white">
        <p className="text-sm text-white/70">Total balance across accounts</p>
        <p className="mt-1 text-3xl font-bold">
          AED {totalBalance.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="space-y-3">
        {accounts.map((account) => {
          const Icon = typeIcons[account.type] ?? Wallet
          return (
            <div key={account.id} className="bento-card flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stacko-red/10 text-stacko-red">
                <Icon size={22} />
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
          )
        })}

        <div className="bento-card flex items-center gap-4 border border-dashed border-gray-200">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-stacko-gray">
            <TrendingUp size={22} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-stacko-black">Investment Account</p>
            <p className="text-xs text-stacko-gray">AED 45,200.00 · +12.4% this month</p>
          </div>
        </div>
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
