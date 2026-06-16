import Image from 'next/image'
import { brand } from '@/config/brand'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
  showText?: boolean
}

const sizes = {
  sm: { box: 'h-8 w-8', letter: 'text-base', text: 'text-xl' },
  md: { box: 'h-9 w-9', letter: 'text-lg', text: 'text-2xl' },
  lg: { box: 'h-11 w-11', letter: 'text-xl', text: 'text-4xl' },
}

export function Logo({ size = 'md', variant = 'dark', showText = true }: LogoProps) {
  const textColor = variant === 'light' ? 'text-white' : 'text-stacko-red'
  const s = sizes[size]

  return (
    <div className="flex items-center gap-2">
      {brand.logoImage ? (
        <Image
          src={brand.logoImage}
          alt={brand.name}
          width={size === 'lg' ? 44 : size === 'sm' ? 32 : 36}
          height={size === 'lg' ? 44 : size === 'sm' ? 32 : 36}
          className="object-contain"
          priority
        />
      ) : (
        <div className={`flex ${s.box} items-center justify-center rounded-lg bg-stacko-red shadow-md`}>
          <span className={`font-extrabold text-white ${s.letter}`}>{brand.logoLetter}</span>
        </div>
      )}
      {showText && (
        <span className={`${s.text} font-extrabold tracking-tight ${textColor}`}>
          {brand.name}
        </span>
      )}
    </div>
  )
}
