import { useMemo, useState } from 'react'
import { CalendarDays, Lightbulb, Plus } from 'lucide-react'
import { BudgetCard } from '../../components/finance/BudgetCard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Progress } from '../../components/ui/Progress'
import { budgets as initialBudgets, categories, financialSummary } from '../../data/mocks'
import { CreateBudgetDrawer, type NewBudgetInput } from '../../features/budgets/CreateBudgetDrawer'
import { formatCurrency } from '../../lib/formatters'
import type { Budget } from '../../types/finance'

export function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const addedLimit = budgets.slice(initialBudgets.length).reduce((total, budget) => total + budget.limit, 0)
  const planned = financialSummary.monthlyBudget + addedLimit
  const spent = financialSummary.budgetSpent
  const available = planned - spent
  const progress = Math.round((spent / planned) * 100)
  const availableCategories = useMemo(() => categories.filter((category) => category.id !== 'income' && !budgets.some((budget) => budget.categoryId === category.id)), [budgets])

  function createBudget(input: NewBudgetInput) {
    setBudgets((current) => [...current, { id: `budget-${input.categoryId}-${Date.now()}`, categoryId: input.categoryId, limit: input.limit, spent: 0, alertAt: input.alertAt }])
    setDrawerOpen(false)
  }

  return <><div className="mx-auto max-w-[1120px] space-y-7"><header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h1 className="text-[28px] font-semibold tracking-tight">Orçamentos</h1><p className="mt-1 max-w-lg text-sm text-muted">Planeje seus gastos e acompanhe seus limites mensais.</p></div><div className="flex items-center gap-3"><button className="focus-ring flex h-11 items-center gap-3 rounded-control border border-border bg-surface px-4 text-sm"><CalendarDays size={17} className="text-muted" />Setembro 2026⌄</button><Button className="h-11" onClick={() => setDrawerOpen(true)}><Plus size={18} />Criar orçamento</Button></div></header><Card className="p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[11px] font-semibold tracking-[.06em] text-muted">QUANTO AINDA POSSO GASTAR ESTE MÊS?</p><div className="mt-3 flex flex-wrap items-baseline gap-3"><strong className="tabular text-3xl">{formatCurrency(available)}</strong><span className="text-sm text-primary">Você ainda pode gastar este mês</span></div></div><span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs text-primary">● Dentro do orçamento</span></div><div className="mt-6"><div className="mb-2 flex justify-between text-sm"><span>{progress}% utilizado</span><span className="tabular text-muted">{formatCurrency(spent)} de {formatCurrency(planned)}</span></div><Progress value={progress} /></div><div className="mt-6 grid grid-cols-3 gap-5 border-t border-border pt-5"><SummaryMetric label="Planejado" value={planned} /><SummaryMetric label="Gasto até agora" value={spent} /><SummaryMetric label="Disponível" value={available} accent /></div></Card><section><div className="mb-4 flex items-center gap-3"><h2 className="text-lg font-semibold">Orçamentos por categoria</h2><span className="rounded-full bg-surface-interactive px-2.5 py-1 text-xs text-muted">{budgets.length} categorias</span></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{budgets.map((budget) => { const category = categories.find((item) => item.id === budget.categoryId); return category ? <BudgetCard key={budget.id} budget={budget} category={category} /> : null })}</div></section><div className="flex items-center gap-3 rounded-card border border-border bg-surface px-5 py-4 text-sm text-muted"><span className="grid size-8 shrink-0 place-items-center rounded-control bg-primary/10 text-primary"><Lightbulb size={17} /></span><p><strong className="font-medium text-text">Projeção favorável:</strong> Se mantiver o ritmo atual, você deve terminar o mês dentro do orçamento planejado.</p></div></div><CreateBudgetDrawer open={drawerOpen} categories={availableCategories} onClose={() => setDrawerOpen(false)} onCreate={createBudget} /></>
}

function SummaryMetric({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return <div><p className="text-[11px] font-semibold tracking-[.05em] text-muted">{label.toUpperCase()}</p><p className={`tabular mt-2 text-lg font-semibold ${accent ? 'text-primary' : ''}`}>{formatCurrency(value)}</p></div>
}
