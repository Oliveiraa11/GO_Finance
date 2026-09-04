import type { Budget, Insight } from '../../types/finance'

export const financialSummary = {
  income: 5800,
  expenses: 3459.5,
  balance: 2340.5,
  savingsRate: 40.3,
  monthlyBudget: 3800,
  budgetSpent: 2670,
  budgetAvailable: 1130,
}

export const categorySpending = [
  { name: 'Alimentação', amount: 820, percentage: 24, color: '#22c55e' },
  { name: 'Transporte', amount: 610, percentage: 18, color: '#06b6d4' },
  { name: 'Educação', amount: 550, percentage: 16, color: '#6366f1' },
  { name: 'Lazer', amount: 430, percentage: 13, color: '#f59e0b' },
  { name: 'Saúde', amount: 310, percentage: 9, color: '#3b82f6' },
  { name: 'Outros', amount: 739.5, percentage: 20, color: '#64748b' },
]

export const budgets: Budget[] = [
  { id: 'b1', categoryId: 'food', limit: 900, spent: 620, alertAt: 80 },
  { id: 'b2', categoryId: 'transport', limit: 600, spent: 310, alertAt: 80 },
  { id: 'b3', categoryId: 'leisure', limit: 500, spent: 420, alertAt: 80 },
  { id: 'b4', categoryId: 'health', limit: 350, spent: 190, alertAt: 80 },
  { id: 'b5', categoryId: 'education', limit: 700, spent: 550, alertAt: 80 },
  { id: 'b6', categoryId: 'shopping', limit: 500, spent: 580, alertAt: 80 },
]

export const insights: Insight[] = [
  { id: 'i1', title: 'Seus gastos diminuíram 12% este mês.', description: 'Você gastou R$ 418 a menos comparado ao mês passado. Sua disciplina orçamentária mantém a reserva em aceleração.', tone: 'positive', detailTitle: 'Gastos com Lazer', detailValue: 'Lazer ↓ 24%', progress: 82 },
]
