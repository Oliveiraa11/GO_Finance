export type TransactionKind = 'income' | 'expense'

export interface Account {
  id: string
  name: 'Nubank' | 'Conta corrente' | 'Dinheiro'
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
}

export interface Transaction {
  id: string
  description: string
  amount: number
  kind: TransactionKind
  date: string
  categoryId: string
  accountId: string
  dateLabel?: string
  note?: string
}

export interface Budget {
  id: string
  categoryId: string
  limit: number
  spent: number
  alertAt: number
}

export interface Insight {
  id: string
  title: string
  description: string
  tone: 'positive' | 'warning' | 'danger' | 'neutral'
  detailTitle?: string
  detailValue?: string
  progress?: number
}
