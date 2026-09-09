import { useMemo, useState } from 'react'
import { CalendarDays, Lightbulb, Plus } from 'lucide-react'
import { BudgetCard } from '../../components/finance/BudgetCard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Progress } from '../../components/ui/Progress'
import { useFinanceStore } from '../../app/store/useFinanceStore'
import { CreateBudgetDrawer, type NewBudgetInput } from '../../features/budgets/CreateBudgetDrawer'
import { getBudgetStatus } from '../../features/budgets/budget-status'
import { periodKey, sumExpensesForCategory } from '../../features/analytics/finance-selectors'
import { formatCurrency } from '../../lib/formatters'

export function BudgetsPage() {
  const { budgets, transactions, categories, addBudget, activePeriod } = useFinanceStore()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const visibleBudgets = useMemo(() => budgets.filter((budget) => budget.month === periodKey(activePeriod)), [activePeriod, budgets])
  const expenseTotals = useMemo(() => Object.fromEntries(visibleBudgets.map((budget) => [budget.categoryId, sumExpensesForCategory(transactions, budget.categoryId, activePeriod)])), [activePeriod, transactions, visibleBudgets])
  const planned = visibleBudgets.reduce((total, budget) => total + budget.limit, 0)
  const spent = visibleBudgets.reduce((total, budget) => total + (expenseTotals[budget.categoryId] ?? 0), 0)
  const available = planned - spent
  const progress = planned > 0 ? Math.round((spent / planned) * 100) : 0
  const status = getBudgetStatus(progress)
  const expenseCategories = useMemo(() => categories.filter((category) => category.type === 'expense'), [categories])
  const statusLabel = status === 'danger' ? 'Acima do orçamento' : status === 'warning' ? 'Próximo do limite' : 'Dentro do orçamento'
  const statusClass = status === 'danger' ? 'border-danger/30 bg-danger/10 text-danger' : status === 'warning' ? 'border-warning/30 bg-warning/10 text-warning' : 'border-primary/30 bg-primary/10 text-primary'
  const availableMessage = available >= 0 ? 'Você ainda pode gastar este mês' : 'Valor acima do orçamento neste mês'
  const projection = status === 'danger' ? 'Revise os limites ou reduza os gastos para retornar ao orçamento planejado.' : status === 'warning' ? 'Alguns gastos estão próximos do limite; acompanhe as próximas despesas.' : 'Se mantiver o ritmo atual, você deve terminar o mês dentro do orçamento planejado.'

  function createBudget(input: NewBudgetInput) {
    addBudget({ categoryId: input.categoryId, limit: input.limit, month: input.month, alertAt: input.alertAt })
    setDrawerOpen(false)
  }

    return <><div className="mx-auto max-w-[1120px] space-y-7"><header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><h1 className="text-[28px] font-semibold tracking-tight">Orçamentos</h1><p className="mt-1 max-w-lg text-sm text-muted">Planeje seus gastos e acompanhe seus limites mensais.</p></div><div className="flex items-center gap-3"><button className="focus-ring flex h-11 items-center gap-3 rounded-control border border-border bg-surface px-4 text-sm"><CalendarDays size={17} className="text-muted" />Setembro 2026⌄</button><Button className="h-11" onClick={() => setDrawerOpen(true)}><Plus size={18} />Criar orçamento</Button></div></header><Card className="p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[11px] font-semibold tracking-[.06em] text-muted">QUANTO AINDA POSSO GASTAR ESTE MÊS?</p><div className="mt-3 flex flex-wrap items-baseline gap-3"><strong className="tabular text-3xl">{formatCurrency(available)}</strong><span className="text-sm text-primary">{availableMessage}</span></div></div><span className={`rounded-full border px-4 py-2 text-xs ${statusClass}`}>● {statusLabel}</span></div><div className="mt-6"><div className="mb-2 flex justify-between text-sm"><span>{progress}% utilizado</span><span className="tabular text-muted">{formatCurrency(spent)} de {formatCurrency(planned)}</span></div><Progress value={progress} tone={status} /></div><div className="mt-6 grid grid-cols-3 gap-5 border-t border-border pt-5"><SummaryMetric label="Planejado" value={planned} /><SummaryMetric label="Gasto até agora" value={spent} /><SummaryMetric label="Disponível" value={available} accent /></div></Card><section><div className="mb-4 flex items-center gap-3"><h2 className="text-lg font-semibold">Orçamentos por categoria</h2><span className="rounded-full bg-surface-interactive px-2.5 py-1 text-xs text-muted">{visibleBudgets.length} categorias</span></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visibleBudgets.map((budget) => { const category = categories.find((item) => item.id === budget.categoryId); return category ? <BudgetCard key={budget.id} budget={budget} category={category} spent={expenseTotals[budget.categoryId] ?? 0} /> : null })}</div></section><div className="flex items-center gap-3 rounded-card border border-border bg-surface px-5 py-4 text-sm text-muted"><span className="grid size-8 shrink-0 place-items-center rounded-control bg-primary/10 text-primary"><Lightbulb size={17} /></span><p><strong className="font-medium text-text">{status === 'primary' ? 'Projeção favorável:' : 'Atenção:'}</strong> {projection}</p></div></div><CreateBudgetDrawer open={drawerOpen} categories={expenseCategories} budgets={budgets} onClose={() => setDrawerOpen(false)} onCreate={createBudget} /></>
}

function SummaryMetric({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return <div><p className="text-[11px] font-semibold tracking-[.05em] text-muted">{label.toUpperCase()}</p><p className={`tabular mt-2 text-lg font-semibold ${accent ? 'text-primary' : ''}`}>{formatCurrency(value)}</p></div>
}
