'use client'

import { useState } from 'react'
import { CreditCard, Snowflake, Eye, EyeOff, Plus } from 'lucide-react'
import { Button } from '@/components/Button'

const cards = [
  {
    id: '1',
    type: 'Debit',
    name: 'Stacko Platinum Debit',
    number: '4532 •••• •••• 8291',
    expiry: '09/28',
    holder: 'Ahmed Al Mansouri',
    balance: 128450.75,
    frozen: false,
  },
  {
    id: '2',
    type: 'Credit',
    name: 'Stacko Rewards Credit',
    number: '5421 •••• •••• 3307',
    expiry: '03/27',
    holder: 'Ahmed Al Mansouri',
    balance: 8420.0,
    limit: 25000,
    frozen: false,
  },
]

export default function CardsPage() {
  const [cardState, setCardState] = useState(cards)
  const [showNumbers, setShowNumbers] = useState(false)

  const toggleFreeze = (id: string) => {
    setCardState((prev) =>
      prev.map((card) => (card.id === id ? { ...card, frozen: !card.frozen } : card)),
    )
  }

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-stacko-black">Cards</h1>
          <p className="text-sm text-stacko-gray">Manage debit and credit cards</p>
        </div>
        <button
          onClick={() => setShowNumbers(!showNumbers)}
          className="rounded-xl bg-white p-2.5 shadow-sm"
          aria-label="Toggle card numbers"
        >
          {showNumbers ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <div className="space-y-4">
        {cardState.map((card) => (
          <div key={card.id} className="space-y-3">
            <div
              className={`gradient-red relative overflow-hidden rounded-3xl p-6 text-white shadow-xl ${
                card.frozen ? 'opacity-60 grayscale' : ''
              }`}
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/10" />
              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                    {card.type}
                  </span>
                  <CreditCard size={28} className="text-white/80" />
                </div>
                <p className="mb-6 font-mono text-lg tracking-widest">
                  {showNumbers ? card.number.replace(/•/g, '•') : card.number}
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase text-white/50">Card holder</p>
                    <p className="text-sm font-medium">{card.holder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase text-white/50">Expires</p>
                    <p className="text-sm font-medium">{card.expiry}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bento-card flex items-center justify-between">
              <div>
                <p className="font-medium text-stacko-black">{card.name}</p>
                <p className="text-xs text-stacko-gray">
                  {'limit' in card
                    ? `Used AED ${card.balance.toLocaleString()} of ${card.limit?.toLocaleString()}`
                    : `Available AED ${card.balance.toLocaleString('en-AE', { minimumFractionDigits: 2 })}`}
                </p>
              </div>
              <button
                onClick={() => toggleFreeze(card.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  card.frozen
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-gray-100 text-stacko-gray-dark hover:bg-red-50 hover:text-stacko-red'
                }`}
              >
                <Snowflake size={16} />
                {card.frozen ? 'Unfreeze' : 'Freeze'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Button fullWidth variant="outline">
        <span className="inline-flex items-center gap-2">
          <Plus size={18} />
          Request virtual card
        </span>
      </Button>
    </div>
  )
}
