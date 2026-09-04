import { useEffect, useId, useMemo, useState, type FormEvent } from 'react'
import { CalendarDays, TrendingUp, X } from 'lucide-react'
import type { Category } from '../../types/finance'
import { formatCurrency } from '../../lib/formatters'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'

export interface NewBudgetInput {
  categoryId: string
  limit: number
  month: string
  alertAt: number
}

interface CreateBudgetDrawerProps {
  open: boolean
  categories: Category[]
  onClose: () => void
  onCreate: (input: NewBudgetInput) => void
}

const recentAverages: Record<string, number> = { housing: 1200, subscriptions: 180, other: 340 }

export function CreateBudgetDrawer({ open, categories, onClose, onCreate }: CreateBudgetDrawerProps) {
  const titleId = useId()
  const [categoryId, setCategoryId] = useState('')
  const [limit, setLimit] = useState('')
  const [month, setMonth] = useState('2026-09')
  const [alertEnabled, setAlertEnabled] = useState(true)
  const numericLimit = Number(limit.replace(',', '.'))
  const recentAverage = useMemo(() => recentAverages[categoryId] ?? 0, [categoryId])

  useEffect(() => {
    if (!open) return
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', handleKeyDown); document.body.style.overflow = previousOverflow }
  }, [open, onClose])

  if (!open) return null

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!categoryId || !Number.isFinite(numericLimit) || numericLimit <= 0) return
    onCreate({ categoryId, limit: numericLimit, month, alertAt: alertEnabled ? 80 : 101 })
    setCategoryId('')
    setLimit('')
    setAlertEnabled(true)
  }

  return <div className="fixed inset-0 z-[70]" role="presentation"><button className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-[2px]" aria-label="Fechar drawer" onClick={onClose} /><aside role="dialog" aria-modal="true" aria-labelledby={titleId} className="absolute inset-y-0 right-0 flex w-full max-w-[500px] flex-col border-l border-border bg-[#10161d] shadow-[-18px_0_50px_rgba(0,0,0,.35)]"><header className="flex items-start justify-between border-b border-border px-7 py-6"><div><h2 id={titleId} className="text-xl font-semibold">Criar orçamento</h2><p className="mt-1 text-sm text-muted">Defina quanto deseja gastar em uma categoria.</p></div><button onClick={onClose} aria-label="Fechar" className="focus-ring rounded-control p-1.5 text-muted hover:bg-surface-interactive hover:text-text"><X size={20} /></button></header><form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-7 py-7"><label className="block"><span className="mb-2 block text-sm font-medium">Categoria</span><Select value={categoryId} onChange={(event) => setCategoryId(event.target.value)} required className="h-12 bg-surface-interactive"><option value="">Selecionar categoria</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</Select></label><label className="block rounded-card border border-border-strong bg-surface p-5"><span className="flex items-center justify-between text-[11px] font-semibold tracking-[.05em] text-muted">LIMITE MENSAL <i className="not-italic text-primary">● Ativo</i></span><div className="mt-3 flex items-center gap-2 text-primary"><span className="tabular text-2xl font-semibold">R$</span><Input autoFocus inputMode="decimal" value={limit} onChange={(event) => setLimit(event.target.value)} placeholder="0,00" aria-label="Limite mensal" className="tabular h-auto border-0 bg-transparent p-0 text-2xl font-semibold text-primary outline-none focus:outline-none" /></div></label><div className="flex items-center gap-3 rounded-control border border-border bg-surface p-4"><span className="grid size-8 place-items-center rounded-control bg-primary/10 text-primary"><TrendingUp size={17} /></span><span className="flex-1 text-sm text-muted">Gasto médio recente:</span><strong className="tabular text-sm">{recentAverage ? `${formatCurrency(recentAverage)}/mês` : 'Selecione a categoria'}</strong></div><label className="block"><span className="mb-2 block text-sm font-medium">Mês de referência</span><div className="relative"><Input type="month" value={month} onChange={(event) => setMonth(event.target.value)} required className="h-12 bg-surface-interactive pr-11" /><CalendarDays className="pointer-events-none absolute right-3 top-3.5 text-muted" size={18} /></div></label><div className="flex items-center justify-between border-t border-border pt-5"><div><p className="text-sm font-medium">Alertar aos 80%</p><p className="mt-1 text-xs text-muted">Receba um aviso antes de atingir o teto</p></div><button type="button" role="switch" aria-checked={alertEnabled} onClick={() => setAlertEnabled((value) => !value)} className={`focus-ring relative h-7 w-12 rounded-full transition ${alertEnabled ? 'bg-primary' : 'bg-border-strong'}`}><span className={`absolute top-1 size-5 rounded-full bg-white transition ${alertEnabled ? 'left-6' : 'left-1'}`} /></button></div></div><footer className="flex items-center justify-end gap-3 border-t border-border px-7 py-5"><Button variant="ghost" onClick={onClose}>Cancelar</Button><Button type="submit" disabled={!categoryId || !Number.isFinite(numericLimit) || numericLimit <= 0}>Criar orçamento</Button></footer></form></aside></div>
}
