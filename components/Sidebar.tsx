'use client'

import {
  Home,
  CreditCard,
  ArrowLeftRight,
  PieChart,
  User,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './Logo'
import type { Screen } from '@/types'

interface SidebarProps {
  onLogout: () => void
}

const navItems: { id: Screen; label: string; href: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: <Home size={20} /> },
  { id: 'accounts', label: 'Accounts', href: '/accounts', icon: <PieChart size={20} /> },
  { id: 'transfers', label: 'Transfers', href: '/transfers', icon: <ArrowLeftRight size={20} /> },
  { id: 'cards', label: 'Cards', href: '/cards', icon: <CreditCard size={20} /> },
  { id: 'profile', label: 'Profile', href: '/profile', icon: <User size={20} /> },
]

function getActiveScreen(pathname: string): Screen {
  const match = navItems.find((item) => pathname.startsWith(item.href))
  return match?.id ?? 'dashboard'
}

export function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname()
  const active = getActiveScreen(pathname)

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-gray-100 bg-white md:flex">
      <div className="border-b border-gray-100 p-6">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                isActive
                  ? 'bg-stacko-red text-white shadow-md shadow-stacko-red/20'
                  : 'text-stacko-gray-dark hover:bg-stacko-cream'
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-1 border-t border-gray-100 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-stacko-gray-dark transition-colors hover:bg-stacko-cream">
          <Bell size={20} />
          Notifications
        </button>
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-stacko-gray-dark transition-colors hover:bg-stacko-cream">
          <Settings size={20} />
          Settings
        </button>
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-stacko-red transition-colors hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  )
}
