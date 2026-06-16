import {
  ArrowLeftRight,
  CreditCard,
  Receipt,
  TrendingUp,
  Landmark,
  Grid3X3,
} from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  transfer: <ArrowLeftRight size={22} />,
  pay: <Receipt size={22} />,
  cards: <CreditCard size={22} />,
  invest: <TrendingUp size={22} />,
  loan: <Landmark size={22} />,
  more: <Grid3X3 size={22} />,
}

interface QuickActionsProps {
  actions: { id: string; label: string; icon: string }[]
}

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
      {actions.map((action) => (
        <button
          key={action.id}
          className="group flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stacko-red/10 text-stacko-red transition-colors group-hover:bg-stacko-red group-hover:text-white">
            {iconMap[action.icon]}
          </div>
          <span className="text-xs font-medium text-stacko-gray-dark">{action.label}</span>
        </button>
      ))}
    </div>
  )
}
