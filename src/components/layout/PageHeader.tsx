import type { ReactNode } from 'react'

interface PageHeaderProps { title: string; subtitle?: string; eyebrow?: string; action?: ReactNode }

export function PageHeader({ title, subtitle, eyebrow, action }: PageHeaderProps) {
  return <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div>{eyebrow && <p className="mb-1 text-[11px] font-semibold tracking-[.05em] text-primary">{eyebrow}</p>}<h1 className="text-2xl font-semibold tracking-tight sm:text-[28px]">{title}</h1>{subtitle && <p className="mt-1 text-sm text-muted">{subtitle}</p>}</div>{action}</header>
}
