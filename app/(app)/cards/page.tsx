'use client'

import { CreditCard, Plus } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/Button'
import Link from 'next/link'

export default function CardsPage() {
  const { user } = useAuth()
  if (!user) return null

  const hasAccount = user.onboardingCompleted

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div>
        <h1 className="text-2xl font-bold text-stacko-black">Cards</h1>
        <p className="text-sm text-stacko-gray">Manage your debit and credit cards</p>
      </div>

      {hasAccount ? (
        <div className="bento-card flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-stacko-red/10 text-stacko-red">
            <CreditCard size={32} />
          </div>
          <p className="font-semibold text-stacko-black">No cards linked yet</p>
          <p className="mt-1 max-w-xs text-sm text-stacko-gray">
            Request a virtual or physical card to start making payments with your investment account.
          </p>
          <div className="mt-4">
            <Button variant="outline">
              <span className="inline-flex items-center gap-2">
                <Plus size={18} />
                Request a card
              </span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="bento-card py-12 text-center">
          <CreditCard size={32} className="mx-auto mb-3 text-stacko-gray" />
          <p className="font-semibold text-stacko-black">Complete your profile first</p>
          <p className="mt-1 text-sm text-stacko-gray">Cards will be available after account activation</p>
          <Link href="/onboarding" className="mt-3 inline-block text-sm font-semibold text-stacko-red">
            Complete profile →
          </Link>
        </div>
      )}
    </div>
  )
}
