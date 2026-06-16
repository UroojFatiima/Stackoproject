'use client'

import { Bell, Search, TrendingUp, Shield, Sparkles } from 'lucide-react'
import { AccountCard } from '@/components/AccountCard'
import { QuickActions } from '@/components/QuickActions'
import { TransactionList } from '@/components/TransactionList'
import { InvestmentBonusCard } from '@/components/InvestmentBonusCard'
import { useAuth } from '@/lib/auth-context'
import {
  accounts,
  baseTransactions,
  bonusTransaction,
  quickActions,
} from '@/data/mockData'

export default function DashboardPage() {
  const { user } = useAuth()
  const displayName = user?.name ?? 'Ahmed Al Mansouri'
  const avatar = user?.avatar ?? 'AM'
  const showBonus = user?.bonusActivated ?? false

  const transactions = showBonus ? [bonusTransaction, ...baseTransactions] : baseTransactions

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-stacko-gray">Good morning,</p>
          <h1 className="text-xl font-bold text-stacko-black md:text-2xl">{displayName}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-xl bg-white p-2.5 shadow-sm transition-colors hover:bg-stacko-cream md:hidden">
            <Search size={20} className="text-stacko-gray-dark" />
          </button>
          <button className="relative rounded-xl bg-white p-2.5 shadow-sm transition-colors hover:bg-stacko-cream">
            <Bell size={20} className="text-stacko-gray-dark" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-stacko-red" />
          </button>
          <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-stacko-red text-sm font-bold text-white md:flex">
            {avatar}
          </div>
        </div>
      </div>

      <AccountCard accounts={accounts} />

      {showBonus && <InvestmentBonusCard />}

      <div>
        <h2 className="mb-3 text-sm font-semibold text-stacko-gray-dark">Quick Actions</h2>
        <QuickActions actions={quickActions} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bento-card gradient-red relative overflow-hidden text-white md:col-span-2">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
          <div className="relative">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={18} />
              <span className="text-xs font-medium uppercase tracking-wider text-white/70">New</span>
            </div>
            <h3 className="mb-1 text-lg font-bold">Grow your wealth with Stacko</h3>
            <p className="mb-4 text-sm text-white/70">
              Start investing from AED 100. Earn up to 8.5% annual returns.
            </p>
            <button className="rounded-xl bg-white px-5 py-2 text-sm font-semibold text-stacko-red transition-colors hover:bg-white/90">
              Start Investing
            </button>
          </div>
        </div>

        <div className="bento-card">
          <div className="mb-3 flex items-center gap-2 text-stacko-red">
            <TrendingUp size={18} />
            <span className="text-xs font-semibold uppercase tracking-wider">Portfolio</span>
          </div>
          <p className="text-2xl font-bold text-stacko-black">AED 45,200</p>
          <p className="mt-1 text-sm text-emerald-600">+12.4% this month</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-stacko-red to-emerald-500" />
          </div>
        </div>

        <div className="bento-card">
          <div className="mb-3 flex items-center gap-2 text-stacko-red">
            <Shield size={18} />
            <span className="text-xs font-semibold uppercase tracking-wider">Security</span>
          </div>
          <p className="text-sm font-medium text-stacko-black">Account Protected</p>
          <p className="mt-1 text-xs text-stacko-gray">2FA enabled · Last login today at 8:42 AM</p>
        </div>

        <div className="bento-card md:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-stacko-gray-dark">
            Monthly Spending Overview
          </h3>
          <div className="flex items-end gap-2">
            {[
              { month: 'Jan', amount: 60 },
              { month: 'Feb', amount: 45 },
              { month: 'Mar', amount: 80 },
              { month: 'Apr', amount: 55 },
              { month: 'May', amount: 70 },
              { month: 'Jun', amount: 40 },
            ].map((bar) => (
              <div key={bar.month} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-lg bg-stacko-red/80 transition-all hover:bg-stacko-red"
                  style={{ height: `${bar.amount}px` }}
                />
                <span className="text-[10px] text-stacko-gray">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bento-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-stacko-black">Recent Transactions</h2>
          <button className="text-sm font-medium text-stacko-red hover:underline">View all</button>
        </div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  )
}
