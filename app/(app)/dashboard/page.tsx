'use client'

import { Bell, Search, TrendingUp, Shield, Sparkles, Wallet } from 'lucide-react'
import Link from 'next/link'
import { AccountCard } from '@/components/AccountCard'
import { QuickActions } from '@/components/QuickActions'
import { TransactionList } from '@/components/TransactionList'
import { InvestmentBonusCard } from '@/components/InvestmentBonusCard'
import { useAuth } from '@/lib/auth-context'
import { quickActions, INVESTMENT_BONUS_AMOUNT } from '@/data/mockData'
import { getUserAccounts, getUserTransactions, getPortfolioBalance, getGreeting } from '@/lib/user-data'
import { brand } from '@/config/brand'

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  const accounts = getUserAccounts(user)
  const transactions = getUserTransactions(user)
  const portfolio = getPortfolioBalance(user)
  const showBonus = user.bonusActivated
  const isNewAccount = !showBonus

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-stacko-gray">{getGreeting()},</p>
          <h1 className="text-xl font-bold text-stacko-black md:text-2xl">{user.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-xl bg-white p-2.5 shadow-sm transition-colors hover:bg-stacko-cream md:hidden">
            <Search size={20} className="text-stacko-gray-dark" />
          </button>
          <button className="relative rounded-xl bg-white p-2.5 shadow-sm transition-colors hover:bg-stacko-cream">
            <Bell size={20} className="text-stacko-gray-dark" />
            {showBonus && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-stacko-red" />
            )}
          </button>
          <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-stacko-red text-sm font-bold text-white md:flex">
            {user.avatar}
          </div>
        </div>
      </div>

      {showBonus && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <strong>Investment bonus activated!</strong> AED {INVESTMENT_BONUS_AMOUNT} has been credited
          to your investment account.
        </div>
      )}

      <AccountCard accounts={accounts} />

      {showBonus && <InvestmentBonusCard />}

      {isNewAccount && (
        <div className="bento-card border border-amber-100 bg-amber-50">
          <p className="font-semibold text-stacko-black">Complete your investment profile</p>
          <p className="mt-1 text-sm text-stacko-gray">
            Finish onboarding to activate your account and receive your 500 AED investment bonus.
          </p>
          <Link
            href="/onboarding"
            className="mt-3 inline-block rounded-xl bg-stacko-red px-5 py-2 text-sm font-semibold text-white"
          >
            Complete profile
          </Link>
        </div>
      )}

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
              <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                Investment
              </span>
            </div>
            <h3 className="mb-1 text-lg font-bold">Grow your wealth with {brand.shortName}</h3>
            <p className="mb-4 text-sm text-white/70">
              Start investing from AED 100. Earn competitive annual returns on your portfolio.
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
          {portfolio > 0 ? (
            <>
              <p className="text-2xl font-bold text-stacko-black">
                AED {portfolio.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
              </p>
              <p className="mt-1 text-sm text-emerald-600">Investment bonus active</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-stacko-red to-emerald-500" />
              </div>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-stacko-black">AED 0.00</p>
              <p className="mt-1 text-sm text-stacko-gray">No investments yet</p>
              <div className="mt-4 flex h-16 items-center justify-center rounded-xl bg-stacko-cream text-xs text-stacko-gray">
                Your portfolio will appear here
              </div>
            </>
          )}
        </div>

        <div className="bento-card">
          <div className="mb-3 flex items-center gap-2 text-stacko-red">
            <Shield size={18} />
            <span className="text-xs font-semibold uppercase tracking-wider">Security</span>
          </div>
          <p className="text-sm font-medium text-stacko-black">Account Protected</p>
          <p className="mt-1 text-xs text-stacko-gray">Secure login · Encrypted session</p>
        </div>

        <div className="bento-card md:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-stacko-gray-dark">Investment Overview</h3>
          {portfolio > 0 ? (
            <div className="flex items-center gap-4 rounded-xl bg-emerald-50 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <Wallet size={22} />
              </div>
              <div>
                <p className="font-semibold text-stacko-black">Welcome Investment Bonus</p>
                <p className="text-sm text-emerald-700">
                  AED {INVESTMENT_BONUS_AMOUNT} credited · Ready to invest
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl bg-stacko-cream py-10 text-center">
              <Wallet size={32} className="mb-2 text-stacko-gray" />
              <p className="text-sm font-medium text-stacko-gray-dark">No investment activity yet</p>
              <p className="mt-1 text-xs text-stacko-gray">
                Complete your profile to receive your welcome bonus
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bento-card">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold text-stacko-black">Recent Activity</h2>
        </div>
        {transactions.length > 0 ? (
          <TransactionList transactions={transactions} />
        ) : (
          <div className="py-8 text-center">
            <p className="text-sm text-stacko-gray">No activity yet</p>
            <p className="mt-1 text-xs text-stacko-gray">
              Your transactions will appear here once you start using your account
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
