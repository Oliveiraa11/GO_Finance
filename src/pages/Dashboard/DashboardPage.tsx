import { ArrowDownLeft, ArrowUpRight, PiggyBank, Wallet } from 'lucide-react'
import { useFinanceStore } from '../../app/store/useFinanceStore'
import { CashFlowChart } from '../../components/charts/CashFlowChart'
import { CategoryChart } from '../../components/charts/CategoryChart'
import { InsightCard } from '../../components/finance/InsightCard'
import { StatCard } from '../../components/finance/StatCard'
import { TransactionItem } from '../../components/finance/TransactionItem'
import { Card } from '../../components/ui/Card'
import { formatCurrency } from '../../lib/formatters'
import { percentChange, periodLabel, previousPeriod, selectCategorySpending, selectFinancialTotals, selectMonthlyCashFlow, selectPeriodTransactions } from '../../features/analytics/finance-selectors'

export function DashboardPage() {
  const { transactions, categories, summary, activePeriod } = useFinanceStore()
  const previous = selectFinancialTotals(transactions, previousPeriod(activePeriod))
  const categorySpending = selectCategorySpending(transactions, categories, activePeriod)
  const cashFlow = selectMonthlyCashFlow(transactions, activePeriod)
  const recent = [...selectPeriodTransactions(transactions, activePeriod)].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
  const expenseChange = percentChange(summary.expenses, previous.expenses)
  const incomeChange = percentChange(summary.income, previous.income)
  const savingsChange = previous.income > 0 ? summary.savingsRate - previous.savingsRate : null
  const largest = categorySpending[0]
  const dashboardInsight = largest ? {
    id: 'largest-category', tone: 'neutral' as const, title: `${largest.name} é sua maior categoria de gastos.`,
    description: `Ela representa ${largest.percentage.toFixed(1).replace('.', ',')}% das despesas de ${periodLabel(activePeriod)}.`,
    detailTitle: largest.name, detailValue: formatCurrency(largest.amount),
  } : { id: 'no-expenses', tone: 'neutral' as const, title: 'Ainda não há despesas neste mês.', description: 'Adicione transações para receber análises financeiras baseadas nos seus dados.' }

  return <div className="space-y-6 lg:-mt-6"><section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Saldo do mês" value={summary.balance} delta={delta(summary.balance, previous.balance)} helper="em relação ao mês anterior" icon={Wallet} featured /><StatCard label="Receitas" value={summary.income} delta={changeLabel(incomeChange)} helper="vs. mês anterior" icon={ArrowDownLeft} /><StatCard label="Despesas" value={summary.expenses} delta={changeLabel(expenseChange)} helper="vs. mês anterior" icon={ArrowUpRight} negative={expenseChange !== null && expenseChange > 0} /><StatCard label="Taxa de poupança" value={summary.savingsRate} format="percent" trailing="do total ganho" delta={savingsChange === null ? 'Sem comparação' : `${signed(savingsChange)} p.p.`} helper={`${formatCurrency(summary.balance)} economizados`} icon={PiggyBank} /></section><section className="grid gap-4 xl:grid-cols-[minmax(0,2.1fr)_minmax(300px,1fr)]"><Card className="min-w-0 overflow-hidden p-6"><div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5"><div><h2 className="text-[17px] font-semibold">Fluxo financeiro</h2><p className="mt-1 text-xs text-muted">Visão consolidada de entradas e saídas operacionais</p></div><div className="flex items-center gap-4 text-xs"><span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-primary" />Receitas</span><span className="flex items-center gap-2"><i className="size-2.5 rounded-full bg-muted" />Despesas</span><span className="rounded-control border border-border bg-surface-interactive px-3 py-2">Últimos 6 meses</span></div></div><div className="min-w-0 pt-3"><CashFlowChart data={cashFlow} /></div><div className="flex items-center justify-between border-t border-border pt-4 text-[11px] text-muted"><span>Período ativo: {periodLabel(activePeriod)}</span><strong className={summary.balance >= 0 ? 'tabular text-primary' : 'tabular text-danger'}>Margem: {formatCurrency(summary.balance)}</strong></div></Card><Card className="min-w-0 overflow-hidden p-6"><div className="flex items-center justify-between border-b border-border pb-4"><h2 className="text-[17px] font-semibold">Gastos por categoria</h2><span className="text-[11px] font-semibold text-muted">{periodLabel(activePeriod).toUpperCase()}</span></div><CategoryChart data={categorySpending} total={summary.expenses} /></Card></section><section className="grid gap-4 xl:grid-cols-[minmax(0,2.1fr)_minmax(300px,1fr)]"><Card className="min-h-[360px] p-6"><div className="mb-2 flex items-center justify-between"><div><h2 className="text-[17px] font-semibold">Transações recentes</h2><p className="mt-1 text-xs text-muted">Últimas movimentações do período ativo</p></div><span className="text-xs font-medium text-primary">Ver todas →</span></div>{recent.length ? recent.map((transaction) => <TransactionItem key={transaction.id} transaction={transaction} />) : <p className="py-12 text-center text-sm text-muted">Nenhuma transação neste período.</p>}</Card><InsightCard insight={dashboardInsight} /></section></div>
}

function changeLabel(change: number | null) { return change === null ? 'Sem comparação' : `${signed(change)}%` }
function delta(current: number, previous: number) { return previous === 0 ? 'Sem comparação' : `${signed(((current - previous) / Math.abs(previous)) * 100)}%` }
function signed(value: number) { return `${value >= 0 ? '+' : ''}${value.toFixed(1).replace('.', ',')}` }
