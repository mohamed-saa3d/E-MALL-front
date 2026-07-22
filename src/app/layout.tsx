import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/components/e-mall/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export const metadata: Metadata = {
  title: { default: 'E-Mall — Everything in one place', template: '%s | E-Mall' },
  description: 'Discover top stores, exclusive deals, and the latest arrivals in one digital mall.',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#f7faf9' }, { media: '(prefers-color-scheme: dark)', color: '#071c19' }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning className="bg-background"><body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}><ThemeProvider>{children}<Toaster richColors /></ThemeProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
