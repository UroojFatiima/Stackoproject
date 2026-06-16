import Image from 'next/image'
import { brand } from '@/config/brand'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
  showText?: boolean
}

const sizes = {
  sm: { icon: 32, logo: 120, text: 'text-sm' },
  md: { icon: 36, logo: 140, text: 'text-base' },
  lg: { icon: 44, logo: 180, text: 'text-lg' },
}

export function Logo({ size = 'md', variant = 'dark', showText = true }: LogoProps) {
  const s = sizes[size]
  const useIconOnly = variant === 'light' && !showText

  if (brand.logoImage && showText && variant === 'dark') {
    return (
      <Image
        src={brand.logoImage}
        alt={brand.name}
        width={s.logo}
        height={40}
        className="h-8 w-auto object-contain md:h-10"
        priority
      />
    )
  }

  if (brand.logoIcon) {
    return (
      <div className="flex items-center gap-2">
        <Image
          src={brand.logoIcon}
          alt={brand.name}
          width={s.icon}
          height={s.icon}
          className="rounded-lg object-contain"
          priority
        />
        {showText && !useIconOnly && (
          <span
            className={`${s.text} font-extrabold tracking-tight ${variant === 'light' ? 'text-white' : 'text-stacko-red'}`}
          >
            {variant === 'light' ? brand.welcomeText.replace('Welcome to ', '') : brand.shortName}
          </span>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stacko-red shadow-md">
        <span className="text-lg font-extrabold text-white">{brand.logoLetter}</span>
      </div>
      {showText && (
        <span
          className={`font-extrabold tracking-tight ${variant === 'light' ? 'text-white' : 'text-stacko-red'}`}
        >
          {brand.name}
        </span>
      )}
    </div>
  )
}
