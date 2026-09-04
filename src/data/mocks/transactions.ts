import type { Transaction } from '../../types/finance'

export const transactions: Transaction[] = [
  { id: 't1', description: 'Mercado Pão de Açúcar', amount: 237.8, kind: 'expense', date: '2026-09-04T14:20:00', dateLabel: 'Hoje, 14:20', categoryId: 'food', accountId: 'nubank' },
  { id: 't2', description: 'Academia Smart Fit', amount: 189.9, kind: 'expense', date: '2026-09-02T09:15:00', dateLabel: '02 set, 09:15', categoryId: 'health', accountId: 'nubank' },
  { id: 't3', description: 'Salário Corporativo', amount: 4500, kind: 'income', date: '2026-09-01T06:00:00', dateLabel: '01 set, 06:00', categoryId: 'income', accountId: 'checking' },
  { id: 't4', description: 'Restaurante Manioca', amount: 68.5, kind: 'expense', date: '2026-08-31T21:40:00', dateLabel: '31 ago, 21:40', categoryId: 'food', accountId: 'nubank' },
  { id: 't5', description: 'Uber Viagens SP', amount: 42.8, kind: 'expense', date: '2026-08-30T18:22:00', dateLabel: '30 ago, 18:22', categoryId: 'transport', accountId: 'nubank' },
]
