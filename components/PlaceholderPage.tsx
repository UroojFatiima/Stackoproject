import { Construction } from 'lucide-react'

interface PlaceholderPageProps {
  title: string
  description: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-stacko-red/10 text-stacko-red">
        <Construction size={32} />
      </div>
      <h1 className="mb-2 text-2xl font-bold text-stacko-black">{title}</h1>
      <p className="max-w-sm text-stacko-gray">{description}</p>
      <p className="mt-4 rounded-full bg-stacko-red/10 px-4 py-1.5 text-xs font-medium text-stacko-red">
        Coming Soon
      </p>
    </div>
  )
}
