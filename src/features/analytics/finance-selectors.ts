import type { Transaction } from '../../types/finance'

export interface MonthlyPeriod { year: number; month: number }
export interface FinancialTotals { income: number; expenses: number; balance: number; savingsRate: number }
export interface CategorySpending { id: string; name: string; color: string; amount: number; percentage: number }

export const INITIAL_ACTIVE_PERIOD: MonthlyPeriod = { year: 2026, month: 9 }

export function periodKey(period: MonthlyPeriod) {
  return `${period.year}-${String(period.month).padStart(2, '0')}`
}

export function previousPeriod(period: MonthlyPeriod): MonthlyPeriod {
  return period.month === 1 ? { year: period.year - 1, month: 12 } : { year: period.year, month: period.month - 1 }
}

export function periodLabel(period: MonthlyPeriod, format: 'long' | 'short' = 'long') {
  const date = new Date(Date.UTC(period.year, period.month - 1, 1))
  const label = new Intl.DateTimeFormat('pt-BR', { month: format, year: format === 'long' ? 'numeric' : undefined, timeZone: 'UTC' }).format(date)
  return label.charAt(0).toUpperCase() + label.slice(1)
}

export function selectPeriodTransactions(transactions: Transaction[], period: MonthlyPeriod) {
  const key = periodKey(period)
  return transactions.filter((transaction) => transaction.date.slice(0, 7) === key)
}

export function selectFinancialTotals(transactions: Transaction[], period: MonthlyPeriod): FinancialTotals {
  const periodTransactions = selectPeriodTransactions(transactions, period)
  const income = sumKind(periodTransactions, 'income')
  const expenses = sumKind(periodTransactions, 'expense')
  const balance = income - expenses
  return { income, expenses, balance, savingsRate: income > 0 ? (balance / income) * 100 : 0 }
}

export function selectCategorySpending(transactions: Transaction[], categories: Array<{ id: string; name: string; color: string }>, period: MonthlyPeriod): CategorySpending[] {
  const expenses = selectPeriodTransactions(transactions, period).filter((transaction) => transaction.kind === 'expense')
  const total = sumKind(expenses, 'expense')
  const amounts = expenses.reduce<Record<string, number>>((result, transaction) => {
    result[transaction.categoryId] = (result[transaction.categoryId] ?? 0) + transaction.amount
    return result
  }, {})
  return Object.entries(amounts).map(([id, amount]) => {
    const category = categories.find((item) => item.id === id)
    return { id, name: category?.name ?? 'Sem categoria', color: category?.color ?? '#64748b', amount, percentage: total > 0 ? (amount / total) * 100 : 0 }
  }).sort((a, b) => b.amount - a.amount)
}

export function selectMonthlyCashFlow(transactions: Transaction[], activePeriod: MonthlyPeriod, count = 6) {
  return Array.from({ length: count }, (_, index) => shiftPeriod(activePeriod, index - count + 1)).map((period) => {
    const totals = selectFinancialTotals(transactions, period)
    return { key: periodKey(period), month: periodLabel(period, 'short').replace('.', ''), income: totals.income, expenses: totals.expenses }
  })
}

export function percentChange(current: number, previous: number) {
  return previous > 0 ? ((current - previous) / previous) * 100 : null
}

export function sumExpensesForCategory(transactions: Transaction[], categoryId: string, period: MonthlyPeriod) {
  return selectPeriodTransactions(transactions, period).filter((transaction) => transaction.kind === 'expense' && transaction.categoryId === categoryId).reduce((total, transaction) => total + transaction.amount, 0)
}

function shiftPeriod(period: MonthlyPeriod, offset: number): MonthlyPeriod {
  const date = new Date(Date.UTC(period.year, period.month - 1 + offset, 1))
  return { year: date.getUTCFullYear(), month: date.getUTCMonth() + 1 }
}

function sumKind(transactions: Transaction[], kind: Transaction['kind']) {
  return transactions.filter((transaction) => transaction.kind === kind).reduce((total, transaction) => total + transaction.amount, 0)
}
