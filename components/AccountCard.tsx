'use client'

import { useState } from 'react'
import { Eye, EyeOff, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Account } from '@/types'

interface AccountCardProps {
  accounts: Account[]
}

export function AccountCard({ accounts }: AccountCardProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showBalance, setShowBalance] = useState(true)
  const account = accounts[activeIndex]

  const formatBalance = (amount: number) =>
    amount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  return (
    <div className="gradient-red relative overflow-hidden rounded-3xl p-6 text-white shadow-xl shadow-stacko-red/30">
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full bg-white/5" />

      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">{account.name}</p>
            <p className="text-xs text-white/50">{account.number}</p>
          </div>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="rounded-full bg-white/15 p-2 transition-colors hover:bg-white/25"
            aria-label={showBalance ? 'Hide balance' : 'Show balance'}
          >
            {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        <div className="mb-6">
          <p className="mb-1 text-sm text-white/60">Available Balance</p>
          <p className="text-3xl font-bold tracking-tight md:text-4xl">
            {showBalance ? (
              <>
                <span className="text-lg font-medium text-white/70">{account.currency} </span>
                {formatBalance(account.balance)}
              </>
            ) : (
              '••••••••'
            )}
          </p>
        </div>

        {accounts.length > 1 && (
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveIndex((i) => (i > 0 ? i - 1 : accounts.length - 1))}
              className="rounded-full bg-white/15 p-1.5 transition-colors hover:bg-white/25"
              aria-label="Previous account"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1.5">
              {accounts.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveIndex((i) => (i < accounts.length - 1 ? i + 1 : 0))}
              className="rounded-full bg-white/15 p-1.5 transition-colors hover:bg-white/25"
              aria-label="Next account"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
