import Image from 'next/image'
import { brand } from '@/config/brand'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'light' | 'dark'
  showText?: boolean
}

const sizes = {
  sm: { icon: 32, logo: 120, logoClass: 'h-8 w-auto md:h-9' },
  md: { icon: 36, logo: 160, logoClass: 'h-10 w-auto md:h-11' },
  lg: { icon: 48, logo: 200, logoClass: 'h-12 w-auto md:h-14' },
  xl: { icon: 56, logo: 280, logoClass: 'h-14 w-auto md:h-[4.5rem]' },
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
        height={Math.round(s.logo * 0.22)}
        className={`object-contain ${s.logoClass}`}
        priority
      />
    )
  }

  if (brand.logoIcon) {
    const iconSize = s.icon
    return (
      <div className="flex items-center gap-3">
        <Image
          src={brand.logoIcon}
          alt={brand.name}
          width={iconSize}
          height={iconSize}
          className="rounded-lg object-contain"
          style={{ width: iconSize, height: iconSize }}
          priority
        />
        {showText && !useIconOnly && (
          <span
            className={`font-extrabold tracking-tight ${
              size === 'xl' ? 'text-2xl md:text-3xl' : size === 'lg' ? 'text-xl md:text-2xl' : 'text-lg'
            } ${variant === 'light' ? 'text-white' : 'text-stacko-red'}`}
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
