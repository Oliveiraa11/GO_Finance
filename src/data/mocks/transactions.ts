import type { Transaction } from '../../types/finance'

export const transactions: Transaction[] = [
  { id: 't1', description: 'Mercado Pão de Açúcar', amount: 237.8, kind: 'expense', date: '2026-09-04T14:20:00', dateLabel: 'Hoje, 14:20', categoryId: 'food', accountId: 'nubank' },
  { id: 't2', description: 'Academia Smart Fit', amount: 189.9, kind: 'expense', date: '2026-09-02T09:15:00', dateLabel: '02 set, 09:15', categoryId: 'health', accountId: 'nubank' },
  { id: 't3', description: 'Salário Corporativo', amount: 4500, kind: 'income', date: '2026-09-01T06:00:00', dateLabel: '01 set, 06:00', categoryId: 'income', accountId: 'checking' },
  { id: 't4', description: 'Restaurante Manioca', amount: 68.5, kind: 'expense', date: '2026-08-31T21:40:00', dateLabel: '31 ago, 21:40', categoryId: 'food', accountId: 'nubank' },
  { id: 't5', description: 'Uber Viagens SP', amount: 42.8, kind: 'expense', date: '2026-08-30T18:22:00', dateLabel: '30 ago, 18:22', categoryId: 'transport', accountId: 'nubank' },
  { id: 't6', description: 'Aluguel apartamento', amount: 1450, kind: 'expense', date: '2026-08-28T10:00:00', categoryId: 'housing', accountId: 'checking', note: 'Moradia mensal' },
  { id: 't7', description: 'Netflix Premium 4K', amount: 44.9, kind: 'expense', date: '2026-08-25T08:30:00', categoryId: 'leisure', accountId: 'nubank', note: 'Assinatura streaming' },
  { id: 't8', description: 'Freelance identidade visual', amount: 1250, kind: 'income', date: '2026-08-22T16:00:00', categoryId: 'income', accountId: 'checking' },
  { id: 't9', description: 'Farmácia Droga Raia', amount: 86.45, kind: 'expense', date: '2026-08-20T13:40:00', categoryId: 'health', accountId: 'cash' },
  { id: 't10', description: 'Curso de inglês', amount: 320, kind: 'expense', date: '2026-08-18T19:10:00', categoryId: 'education', accountId: 'checking' },
  { id: 't11', description: 'Livraria Cultura', amount: 119.9, kind: 'expense', date: '2026-08-15T12:20:00', categoryId: 'education', accountId: 'nubank' },
  { id: 't12', description: 'Reembolso corporativo', amount: 185.7, kind: 'income', date: '2026-08-12T09:00:00', categoryId: 'income', accountId: 'checking' },
  { id: 't13', description: 'Conta de energia', amount: 164.32, kind: 'expense', date: '2026-08-10T11:30:00', categoryId: 'housing', accountId: 'checking' },
  { id: 't14', description: 'Cinema e jantar', amount: 132, kind: 'expense', date: '2026-08-08T22:10:00', categoryId: 'leisure', accountId: 'nubank' },
  { id: 't15', description: 'Venda de equipamento', amount: 780, kind: 'income', date: '2026-08-05T15:45:00', categoryId: 'income', accountId: 'cash' },
  { id: 't16', description: 'Supermercado Natural', amount: 312.65, kind: 'expense', date: '2026-08-03T18:00:00', categoryId: 'food', accountId: 'nubank' },
  { id: 't17', description: 'Manutenção do carro', amount: 540, kind: 'expense', date: '2026-08-02T14:25:00', categoryId: 'transport', accountId: 'checking' },
  { id: 't18', description: 'Salário Corporativo', amount: 4500, kind: 'income', date: '2026-08-01T06:00:00', categoryId: 'income', accountId: 'checking' },
]
