import type { ReactNode } from 'react'
import { PublicLayout as PublicShell } from '@/components/layouts/PublicLayout'

export default function PublicGroupLayout({ children }: { children: ReactNode }) {
  return <PublicShell>{children}</PublicShell>
}
