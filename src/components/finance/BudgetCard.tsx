import { formatCurrency } from '../../lib/formatters'
import type { Budget } from '../../types/finance'
import { Card } from '../ui/Card'
import { Progress } from '../ui/Progress'

export function BudgetCard({ budget, name }: { budget: Budget; name: string }) {
  const percentage = Math.round((budget.spent / budget.limit) * 100)
  return <Card><div className="flex justify-between gap-4"><p className="font-medium">{name}</p><span className="tabular text-xs text-muted">{percentage}%</span></div><p className="tabular my-4 text-lg">{formatCurrency(budget.spent)} <span className="font-sans text-xs text-muted">de {formatCurrency(budget.limit)}</span></p><Progress value={percentage} tone={percentage > 100 ? 'danger' : percentage >= 80 ? 'warning' : 'primary'} /></Card>
}
