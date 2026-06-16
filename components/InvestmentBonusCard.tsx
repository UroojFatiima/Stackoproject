import { Gift, CheckCircle2 } from 'lucide-react'
import { INVESTMENT_BONUS_AMOUNT } from '@/data/mockData'

export function InvestmentBonusCard() {
  return (
    <div className="bento-card border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white">
      <div className="mb-3 flex items-center gap-2 text-emerald-600">
        <Gift size={18} />
        <span className="text-xs font-semibold uppercase tracking-wider">Welcome Bonus</span>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-stacko-gray-dark">Investment Bonus</p>
          <p className="text-lg font-bold text-stacko-black">AED {INVESTMENT_BONUS_AMOUNT}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-stacko-gray-dark">Bonus Status</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            <CheckCircle2 size={14} />
            Activated
          </span>
        </div>
      </div>
    </div>
  )
}
