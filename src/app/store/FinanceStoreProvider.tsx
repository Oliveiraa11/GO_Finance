import { useMemo, useState, type PropsWithChildren } from 'react'
import { budgets as initialBudgets, transactions as initialTransactions } from '../../data/mocks'
import { paymentMethodMocks, profileSettings, settingsCategoryMocks, type PaymentMethod, type SettingsCategory } from '../../data/mocks/settings'
import type { Budget, Transaction } from '../../types/finance'
import { FinanceStoreContext, type UserProfile } from './finance-store-context'
import { INITIAL_ACTIVE_PERIOD, selectFinancialTotals, type MonthlyPeriod } from '../../features/analytics/finance-selectors'

export function FinanceStoreProvider({ children }: PropsWithChildren) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets)
  const [categories, setCategories] = useState<SettingsCategory[]>(settingsCategoryMocks)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(paymentMethodMocks)
  const [profile, setProfile] = useState<UserProfile>(profileSettings)
  const [activePeriod, setActivePeriod] = useState<MonthlyPeriod>(INITIAL_ACTIVE_PERIOD)

  const value = useMemo(() => {
    return {
      transactions,
      budgets,
      categories,
      paymentMethods,
      profile,
      activePeriod,
      summary: selectFinancialTotals(transactions, activePeriod),
      addTransaction: (transaction: Omit<Transaction, 'id'>) => setTransactions((items) => [{ ...transaction, dateLabel: formatDateLabel(transaction.date), id: crypto.randomUUID() }, ...items]),
      updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => setTransactions((items) => items.map((item) => item.id === id ? { ...transaction, dateLabel: formatDateLabel(transaction.date), id } : item)),
      duplicateTransaction: (transaction: Transaction) => setTransactions((items) => [{ ...transaction, id: crypto.randomUUID(), description: `${transaction.description} (cópia)` }, ...items]),
      removeTransaction: (id: string) => setTransactions((items) => items.filter((item) => item.id !== id)),
      addBudget: (budget: Omit<Budget, 'id'>) => setBudgets((items) => [...items, { ...budget, id: `budget-${crypto.randomUUID()}` }]),
      addCategory: (category: Omit<SettingsCategory, 'id'>) => setCategories((items) => [...items, { ...category, id: `category-${crypto.randomUUID()}` }]),
      updateCategory: (id: string, category: Partial<Omit<SettingsCategory, 'id'>>) => setCategories((items) => items.map((item) => item.id === id ? { ...item, ...category } : item)),
      removeCategory: (id: string) => setCategories((items) => items.filter((item) => item.id !== id)),
      addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => setPaymentMethods((items) => [...items, { ...method, id: `payment-${crypto.randomUUID()}` }]),
      updatePaymentMethod: (id: string, method: Partial<Omit<PaymentMethod, 'id'>>) => setPaymentMethods((items) => items.map((item) => item.id === id ? { ...item, ...method } : item)),
      removePaymentMethod: (id: string) => setPaymentMethods((items) => items.filter((item) => item.id !== id)),
      updateProfile: setProfile,
      setActivePeriod,
    }
  }, [activePeriod, budgets, categories, paymentMethods, profile, transactions])

  return <FinanceStoreContext.Provider value={value}>{children}</FinanceStoreContext.Provider>
}

function formatDateLabel(date: string) {
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', timeZone: 'UTC' }).format(new Date(`${date.slice(0, 10)}T00:00:00Z`))
}
