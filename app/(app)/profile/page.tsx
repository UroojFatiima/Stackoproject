'use client'

import { Bell, Lock, Mail, Phone, Shield, User, MapPin } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/Button'

export default function ProfilePage() {
  const { user } = useAuth()
  const details = user?.onboardingDetails

  const rows = [
    { icon: User, label: 'Full name', value: details?.fullName ?? user?.name ?? '—' },
    { icon: Mail, label: 'Email', value: details?.email ?? user?.email ?? '—' },
    { icon: Phone, label: 'Phone', value: details?.phone ?? '—' },
    { icon: Shield, label: 'Emirates ID', value: details?.nationalId ?? '—' },
    { icon: MapPin, label: 'Address', value: details?.address ? `${details.address}, ${details.city}, ${details.country}` : '—' },
  ]

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      <div>
        <h1 className="text-2xl font-bold text-stacko-black">Profile</h1>
        <p className="text-sm text-stacko-gray">Your personal details and preferences</p>
      </div>

      <div className="bento-card flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stacko-red text-xl font-bold text-white">
          {user?.avatar ?? 'S'}
        </div>
        <div>
          <p className="text-lg font-bold text-stacko-black">{user?.name ?? 'Stacko User'}</p>
          <p className="text-sm text-stacko-gray">{user?.email}</p>
          {user?.bonusActivated && (
            <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              500 AED bonus active
            </span>
          )}
        </div>
      </div>

      <div className="bento-card space-y-1">
        <h2 className="mb-3 font-semibold text-stacko-black">Personal information</h2>
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-stacko-cream"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stacko-red/10 text-stacko-red">
              <row.icon size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-stacko-gray">{row.label}</p>
              <p className="truncate font-medium text-stacko-black">{row.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bento-card space-y-2">
        <h2 className="mb-2 font-semibold text-stacko-black">Security & settings</h2>
        {[
          { icon: Lock, label: 'Change password', desc: 'Update your login password' },
          { icon: Shield, label: 'Two-factor authentication', desc: 'Enabled · Last verified today' },
          { icon: Bell, label: 'Notifications', desc: 'Email and push alerts' },
        ].map((item) => (
          <button
            key={item.label}
            className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-stacko-cream"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-stacko-gray-dark">
              <item.icon size={18} />
            </div>
            <div>
              <p className="font-medium text-stacko-black">{item.label}</p>
              <p className="text-xs text-stacko-gray">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {!user?.onboardingCompleted && (
        <Button fullWidth onClick={() => (window.location.href = '/onboarding')}>
          Complete your profile
        </Button>
      )}
    </div>
  )
}
