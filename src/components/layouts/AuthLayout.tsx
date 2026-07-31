'use client'

import type { ReactNode } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function AuthLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()

  if (pathname.includes('/verify-email')) return children

  return <div className="relative flex min-h-screen items-center justify-center px-4 py-10"><div className="fixed inset-0 bg-[url('/images/mall-interior.png')] bg-cover bg-center" /><div className="fixed inset-0 bg-foreground/25" /><section className="relative w-full max-w-xl rounded-[2rem] border bg-card/92 p-6 shadow-2xl backdrop-blur-xl md:p-10"><Button className="absolute right-5 top-5" variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>{resolvedTheme === 'dark' ? <Sun /> : <Moon />}</Button>{children}</section></div>
}
