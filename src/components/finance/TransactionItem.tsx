import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { useFinanceStore } from '../../app/store/useFinanceStore'
import { formatCurrency } from '../../lib/formatters'
import type { Transaction } from '../../types/finance'

export function TransactionItem({ transaction }: { transaction: Transaction }) {
  const { categories } = useFinanceStore()
  const category = categories.find((item) => item.id === transaction.categoryId)
  const income = transaction.kind === 'income'
  return <div className="flex min-h-14 items-center gap-3 border-b border-border py-2 last:border-0"><span className={`grid size-9 place-items-center rounded-control ${income ? 'bg-primary/15 text-primary' : 'bg-surface-interactive text-muted'}`}>{income ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{transaction.description}</p><p className="mt-0.5 text-xs text-muted">{category?.name ?? 'Sem categoria'}</p></div><time dateTime={transaction.date} className="hidden min-w-28 text-right text-[11px] text-muted md:block">{transaction.dateLabel}</time><p className={`tabular min-w-28 text-right text-sm ${income ? 'text-primary' : 'text-text'}`}>{income ? '+' : '−'} {formatCurrency(transaction.amount)}</p></div>
}
