'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Globe, Settings } from 'lucide-react'
import { brand } from '@/config/brand'
import { Logo } from './Logo'
import { SLIDE_INTERVAL_MS, welcomeSlides } from '@/data/welcomeSlides'

export function WelcomeSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const slideCount = welcomeSlides.length

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex((index + slideCount) % slideCount)
    },
    [slideCount],
  )

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slideCount)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [isPaused, slideCount])

  const current = welcomeSlides[activeIndex]

  return (
    <div className="flex min-h-screen items-center justify-center bg-stacko-black p-0 md:p-6">
      <div
        className="relative mx-auto flex h-[100dvh] w-full max-w-[430px] flex-col overflow-hidden md:h-[844px] md:rounded-[2rem] md:shadow-2xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Background slides */}
        {welcomeSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.image}
              alt={`Welcome slide ${slide.id}`}
              fill
              className="object-cover object-top"
              priority={index === 0}
              sizes="430px"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/55" />
          </div>
        ))}

        {/* Top bar */}
        <div className="relative z-10 px-5 pt-4">
          <div className="mb-4 flex gap-2">
            {welcomeSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                className="h-1 flex-1 overflow-hidden rounded-full bg-white/30"
              >
                <div
                  className={`h-full rounded-full bg-white transition-all duration-300 ${
                    index === activeIndex ? 'w-full' : index < activeIndex ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo size="sm" variant="light" showText={false} />
              <span className="text-sm font-medium text-white">{brand.welcomeText}</span>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 text-sm text-white/90"
              aria-label="Switch language"
            >
              <span>العربية</span>
              <Globe size={16} />
            </button>
          </div>
        </div>

        {/* Slide headline overlay (Stacko branding over image) */}
        <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-4">
          {current.headline && (
            <div className="mb-auto mt-8 text-center">
              <h1 className="text-2xl font-bold leading-tight text-white drop-shadow-md">
                {current.headline}
              </h1>
              {current.subline && (
                <p className="mt-2 text-sm text-white/85 drop-shadow">{current.subline}</p>
              )}
              {current.ctaLabel && (
                <button
                  type="button"
                  className="mt-4 rounded-lg bg-stacko-red/90 px-4 py-2 text-sm font-semibold text-white"
                >
                  {current.ctaLabel}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom CTAs — RAKBank style */}
        <div className="relative z-10 space-y-3 px-5 pb-8">
          <Link
            href="/login"
            className="flex w-full items-center justify-center rounded-full bg-[#e11921] py-4 text-base font-semibold text-white shadow-lg transition-transform active:scale-[0.98]"
          >
            Access Digital Banking
          </Link>
          <Link
            href="/signup"
            className="flex w-full items-center justify-center rounded-full bg-white py-4 text-base font-semibold text-stacko-black shadow-lg transition-transform active:scale-[0.98]"
          >
            Apply for a product
          </Link>
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 py-2 text-sm text-white/90"
          >
            <Settings size={16} />
            More options
          </button>
        </div>

        {/* Swipe zones */}
        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-0 top-0 z-[5] h-full w-1/4"
          onClick={() => goToSlide(activeIndex - 1)}
        />
        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-0 top-0 z-[5] h-full w-1/4"
          onClick={() => goToSlide(activeIndex + 1)}
        />
      </div>
    </div>
  )
}
