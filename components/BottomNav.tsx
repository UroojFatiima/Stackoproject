'use client'

import { Home, CreditCard, ArrowLeftRight, PieChart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Screen } from '@/types'

const navItems: { id: Screen; label: string; href: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Home', href: '/dashboard', icon: <Home size={22} /> },
  { id: 'accounts', label: 'Accounts', href: '/accounts', icon: <PieChart size={22} /> },
  { id: 'transfers', label: 'Transfer', href: '/transfers', icon: <ArrowLeftRight size={22} /> },
  { id: 'cards', label: 'Cards', href: '/cards', icon: <CreditCard size={22} /> },
  { id: 'profile', label: 'Profile', href: '/profile', icon: <User size={22} /> },
]

function getActiveScreen(pathname: string): Screen {
  const match = navItems.find((item) => pathname.startsWith(item.href))
  return match?.id ?? 'dashboard'
}

export function BottomNav() {
  const pathname = usePathname()
  const active = getActiveScreen(pathname)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/95 px-2 py-2 backdrop-blur-lg md:hidden">
      <div className="mx-auto flex max-w-lg items-center justify-around">
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors ${
                isActive ? 'text-stacko-red' : 'text-stacko-gray'
              }`}
            >
              <div
                className={`rounded-xl p-1 transition-colors ${isActive ? 'bg-stacko-red/10' : ''}`}
              >
                {item.icon}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
