import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthProvider } from '@/lib/auth-context'
import { brand } from '@/config/brand'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: `${brand.name} — Digital Banking`,
  description: brand.tagline,
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    title: brand.shortName,
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/logo-icon.png',
    apple: '/logo-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
