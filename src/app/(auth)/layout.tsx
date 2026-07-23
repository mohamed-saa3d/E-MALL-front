import type { ReactNode } from 'react'
import { AuthLayout as AuthShell } from '@/components/layouts/AuthLayout'

export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return <AuthShell>{children}</AuthShell>
}
