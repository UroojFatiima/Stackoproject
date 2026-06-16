import { slideshowImages } from '@/config/brand'

export interface WelcomeSlide {
  id: number
  image: string
  headline?: string
  subline?: string
  ctaLabel?: string
}

export const welcomeSlides: WelcomeSlide[] = [
  {
    id: 1,
    image: `${slideshowImages.folder}/slide-1.png`,
    headline: 'Buy silver digitally starting from 1 gram',
    ctaLabel: 'Learn more',
  },
  {
    id: 2,
    image: `${slideshowImages.folder}/slide-2.png`,
    headline: 'Do you have more than one account?',
    subline: 'Ensure they are all under your sole control.',
  },
  {
    id: 3,
    image: `${slideshowImages.folder}/slide-3.png`,
    headline: 'PROUD OF UAE',
    subline: 'Bank with confidence across the Emirates.',
  },
]

export const SLIDE_INTERVAL_MS = 9000
