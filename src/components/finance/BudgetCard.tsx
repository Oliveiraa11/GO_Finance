import { formatCurrency } from '../../lib/formatters'
import { BookOpen, Car, EllipsisVertical, Heart, House, ShoppingBag, Utensils } from 'lucide-react'
import type { Budget, Category } from '../../types/finance'
import { Card } from '../ui/Card'
import { Progress } from '../ui/Progress'
import { getBudgetStatus } from '../../features/budgets/budget-status'

const icons = { food: Utensils, transport: Car, leisure: BookOpen, health: Heart, education: BookOpen, shopping: ShoppingBag, housing: House }

export function BudgetCard({ budget, category }: { budget: Budget; category: Category }) {
  const percentage = Math.round((budget.spent / budget.limit) * 100)
  const status = getBudgetStatus(percentage)
  const available = budget.limit - budget.spent
  const Icon = icons[budget.categoryId as keyof typeof icons] ?? House
  const toneClass = status === 'danger' ? 'text-danger' : status === 'warning' ? 'text-warning' : 'text-primary'
  return <Card className="min-w-0 p-5"><div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-control border" style={{ color: category.color, borderColor: `${category.color}33`, backgroundColor: `${category.color}12` }}><Icon size={18} /></span><h3 className="min-w-0 flex-1 truncate text-sm font-medium">{category.name}</h3><button className="focus-ring text-muted" aria-label={`Opções de ${category.name}`}><EllipsisVertical size={17} /></button></div><p className={`tabular mt-5 text-xl font-semibold ${status === 'danger' ? 'text-danger' : ''}`}>{formatCurrency(budget.spent)} <span className="font-sans text-xs font-normal text-muted">de {formatCurrency(budget.limit)}</span></p><div className="my-4"><Progress value={percentage} tone={status} /></div><div className="flex items-start justify-between gap-3 border-t border-border pt-3 text-xs"><span className={toneClass}>{percentage}% utilizado</span><span className={`text-right ${status === 'danger' ? 'text-danger' : 'text-muted'}`}>{available >= 0 ? `Disponível: ${formatCurrency(available)}` : `${formatCurrency(Math.abs(available))} acima`}</span></div></Card>
}
