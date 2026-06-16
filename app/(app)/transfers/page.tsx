'use client'

import { useState } from 'react'
import { ArrowLeftRight, Clock, Send, Users } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function TransfersPage() {
  const { user } = useAuth()
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [reference, setReference] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!user) return null

  const canTransfer = user.onboardingCompleted && user.bonusActivated

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canTransfer) return
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setAmount('')
    setRecipient('')
    setReference('')
  }

  const inputClass =
    'w-full rounded-xl border border-gray-200 bg-white py-3.5 px-4 text-stacko-black outline-none transition-all focus:border-stacko-red focus:ring-2 focus:ring-stacko-red/20'

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div>
        <h1 className="text-2xl font-bold text-stacko-black">Transfers</h1>
        <p className="text-sm text-stacko-gray">Send money locally or internationally</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Send, label: 'Send', active: true },
          { icon: Users, label: 'Beneficiaries', active: false },
          { icon: Clock, label: 'Scheduled', active: false },
        ].map((tab) => (
          <button
            key={tab.label}
            className={`flex flex-col items-center gap-2 rounded-2xl p-4 shadow-sm transition-all ${
              tab.active ? 'bg-stacko-red text-white' : 'bg-white text-stacko-gray-dark hover:shadow-md'
            }`}
          >
            <tab.icon size={22} />
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {!canTransfer ? (
        <div className="bento-card py-10 text-center">
          <ArrowLeftRight size={32} className="mx-auto mb-3 text-stacko-gray" />
          <p className="font-semibold text-stacko-black">Transfers unavailable</p>
          <p className="mt-1 text-sm text-stacko-gray">
            Complete your profile and activate your account to send transfers
          </p>
          <Link href="/onboarding" className="mt-3 inline-block text-sm font-semibold text-stacko-red">
            Complete profile →
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bento-card space-y-4">
          <h2 className="flex items-center gap-2 font-semibold text-stacko-black">
            <ArrowLeftRight size={20} className="text-stacko-red" />
            New transfer
          </h2>

          {submitted && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Transfer initiated successfully. Processing within 2 hours.
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
              Recipient name or IBAN
            </label>
            <input
              required
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Enter beneficiary"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
              Amount (AED)
            </label>
            <input
              required
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-stacko-gray-dark">
              Reference (optional)
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Payment reference"
              className={inputClass}
            />
          </div>

          <Button type="submit" fullWidth>
            Send transfer
          </Button>
        </form>
      )}

      <div className="bento-card">
        <h2 className="mb-4 font-semibold text-stacko-black">Recent transfers</h2>
        <div className="py-6 text-center text-sm text-stacko-gray">No transfers yet</div>
      </div>
    </div>
  )
}
