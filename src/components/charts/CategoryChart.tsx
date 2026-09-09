import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../lib/formatters'
import type { CategorySpending } from '../../features/analytics/finance-selectors'

export function CategoryChart({ data, total }: { data: CategorySpending[]; total: number }) {
  const visible = data.slice(0, 6)
  const largest = data[0]
  return <div><div className="grid grid-cols-[145px_1fr] items-center gap-2"><div className="relative h-44"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={visible} dataKey="amount" innerRadius={43} outerRadius={61} paddingAngle={0} stroke="none">{visible.map((entry) => <Cell key={entry.id} fill={entry.color} />)}</Pie></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 grid place-content-center text-center"><span className="text-[10px] text-muted">Total</span><strong className="tabular mt-1 text-xs">{formatCurrency(total)}</strong></div></div><ul className="space-y-2">{visible.map((item) => <li key={item.id} className="grid grid-cols-[8px_1fr_auto] items-center gap-2 text-[11px]"><span className="size-2 rounded-full" style={{ background: item.color }} /><span>{item.name}</span><strong className="tabular">{item.percentage.toFixed(0)}%</strong></li>)}</ul></div><div className="mt-2 flex items-center justify-between rounded-control border border-border bg-surface-interactive p-3"><div><p className="text-[10px] font-semibold text-muted">MAIOR GASTO</p><p className="mt-1 text-xs font-medium">{largest?.name ?? 'Sem despesas'}</p></div><div className="text-right"><p className="tabular text-xs font-semibold">{formatCurrency(largest?.amount ?? 0)}</p><p className="mt-1 text-[10px] text-muted">{(largest?.percentage ?? 0).toFixed(0)}% do total</p></div></div></div>
}
