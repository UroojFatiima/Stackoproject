import {
  ArrowDownLeft,
  ArrowUpRight,
  ShoppingBag,
  Zap,
  ArrowLeftRight,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import type { Transaction } from '@/types'

const iconMap: Record<string, React.ReactNode> = {
  salary: <Wallet size={18} />,
  shopping: <ShoppingBag size={18} />,
  utilities: <Zap size={18} />,
  transfer: <ArrowLeftRight size={18} />,
  investment: <TrendingUp size={18} />,
}

interface TransactionListProps {
  transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-1">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-stacko-cream"
        >
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              tx.type === 'credit'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-red-50 text-stacko-red'
            }`}
          >
            {iconMap[tx.icon] ?? <Wallet size={18} />}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-stacko-black">{tx.title}</p>
            <p className="text-xs text-stacko-gray">
              {tx.category} · {tx.date}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            {tx.type === 'credit' ? (
              <ArrowDownLeft size={14} className="text-emerald-500" />
            ) : (
              <ArrowUpRight size={14} className="text-stacko-red" />
            )}
            <span
              className={`font-semibold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-stacko-black'}`}
            >
              {tx.type === 'credit' ? '+' : '-'}AED{' '}
              {tx.amount.toLocaleString('en-AE', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
