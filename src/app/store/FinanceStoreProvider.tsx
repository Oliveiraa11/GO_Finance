import { useMemo, useState, type PropsWithChildren } from 'react'
import { financialSummary, transactions as initialTransactions } from '../../data/mocks'
import { paymentMethodMocks, profileSettings, settingsCategoryMocks, type PaymentMethod, type SettingsCategory } from '../../data/mocks/settings'
import type { Transaction } from '../../types/finance'
import { FinanceStoreContext, type UserProfile } from './finance-store-context'

const initialIncome = totalByKind(initialTransactions, 'income')
const initialExpenses = totalByKind(initialTransactions, 'expense')

export function FinanceStoreProvider({ children }: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [categories, setCategories] = useState<SettingsCategory[]>(settingsCategoryMocks)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(paymentMethodMocks)
  const [profile, setProfile] = useState<UserProfile>(profileSettings)

  const value = useMemo(() => {
    const income = financialSummary.income + totalByKind(transactions, 'income') - initialIncome
    const expenses = financialSummary.expenses + totalByKind(transactions, 'expense') - initialExpenses
    const balance = income - expenses

    return {
      transactions,
      categories,
      paymentMethods,
      profile,
      summary: { income, expenses, balance, savingsRate: income > 0 ? (balance / income) * 100 : 0 },
      addTransaction: (transaction: Omit<Transaction, 'id'>) => setTransactions((items) => [{ ...transaction, dateLabel: formatDateLabel(transaction.date), id: crypto.randomUUID() }, ...items]),
      updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => setTransactions((items) => items.map((item) => item.id === id ? { ...transaction, dateLabel: formatDateLabel(transaction.date), id } : item)),
      duplicateTransaction: (transaction: Transaction) => setTransactions((items) => [{ ...transaction, id: crypto.randomUUID(), description: `${transaction.description} (cópia)` }, ...items]),
      removeTransaction: (id: string) => setTransactions((items) => items.filter((item) => item.id !== id)),
      addCategory: (category: Omit<SettingsCategory, 'id'>) => setCategories((items) => [...items, { ...category, id: `category-${crypto.randomUUID()}` }]),
      updateCategory: (id: string, category: Partial<Omit<SettingsCategory, 'id'>>) => setCategories((items) => items.map((item) => item.id === id ? { ...item, ...category } : item)),
      removeCategory: (id: string) => setCategories((items) => items.filter((item) => item.id !== id)),
      addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => setPaymentMethods((items) => [...items, { ...method, id: `payment-${crypto.randomUUID()}` }]),
      updatePaymentMethod: (id: string, method: Partial<Omit<PaymentMethod, 'id'>>) => setPaymentMethods((items) => items.map((item) => item.id === id ? { ...item, ...method } : item)),
      removePaymentMethod: (id: string) => setPaymentMethods((items) => items.filter((item) => item.id !== id)),
      updateProfile: setProfile,
    }
  }, [categories, paymentMethods, profile, transactions])

  return <FinanceStoreContext.Provider value={value}>{children}</FinanceStoreContext.Provider>
}

function totalByKind(transactions: Transaction[], kind: Transaction['kind']) {
  return transactions.filter((transaction) => transaction.kind === kind).reduce((total, transaction) => total + transaction.amount, 0)
}

function formatDateLabel(date: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', timeZone: 'UTC' }).format(new Date(`${date.slice(0, 10)}T00:00:00Z`))
}
