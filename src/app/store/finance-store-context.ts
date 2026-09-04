import { createContext } from 'react'
import type { PaymentMethod, SettingsCategory } from '../../data/mocks/settings'
import type { Transaction } from '../../types/finance'

export interface UserProfile {
  name: string
  email: string
  initials: string
}

export interface FinanceSummary {
  income: number
  expenses: number
  balance: number
  savingsRate: number
}

export interface FinanceStoreValue {
  transactions: Transaction[]
  categories: SettingsCategory[]
  paymentMethods: PaymentMethod[]
  profile: UserProfile
  summary: FinanceSummary
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void
  duplicateTransaction: (transaction: Transaction) => void
  removeTransaction: (id: string) => void
  addCategory: (category: Omit<SettingsCategory, 'id'>) => void
  updateCategory: (id: string, category: Partial<Omit<SettingsCategory, 'id'>>) => void
  removeCategory: (id: string) => void
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void
  updatePaymentMethod: (id: string, method: Partial<Omit<PaymentMethod, 'id'>>) => void
  removePaymentMethod: (id: string) => void
  updateProfile: (profile: UserProfile) => void
}

export const FinanceStoreContext = createContext<FinanceStoreValue | null>(null)
