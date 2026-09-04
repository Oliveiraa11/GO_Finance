import type { LucideIcon } from 'lucide-react'
import { formatCurrency } from '../../lib/formatters'
import { Card } from '../ui/Card'

interface StatCardProps {
  label: string
  value: number
  delta: string
  helper: string
  icon: LucideIcon
  featured?: boolean
  format?: 'currency' | 'percent'
  trailing?: string
  negative?: boolean
}

export function StatCard({ label, value, delta, helper, icon: Icon, featured, format = 'currency', trailing, negative }: StatCardProps) {
  const displayValue = format === 'percent' ? `${value.toFixed(1).replace('.', ',')}%` : formatCurrency(value)
  return <Card className={`flex min-h-[178px] flex-col justify-between p-6 ${featured ? 'border-primary/40 bg-gradient-to-br from-primary/8 to-surface' : ''}`}><div className="flex items-center justify-between"><div className="flex items-center gap-2"><p className="text-[11px] font-semibold tracking-[.05em] text-muted">{label.toUpperCase()}</p>{featured && <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] text-primary">● Principal</span>}</div><span className="grid size-8 place-items-center rounded-control border border-border bg-surface-interactive"><Icon size={17} className="text-primary" /></span></div><p className="tabular mt-3 text-[26px] font-medium tracking-[-.025em]">{displayValue} {trailing && <span className="font-sans text-[11px] font-normal tracking-normal text-muted">{trailing}</span>}</p><div className="mt-4 flex items-center gap-2 text-[11px]"><span className={`rounded-md border px-2 py-1 font-medium ${negative ? 'border-danger/20 bg-danger/10 text-danger' : 'border-primary/20 bg-primary/10 text-primary'}`}>{delta}</span><span className="text-muted">{helper}</span></div></Card>
}
