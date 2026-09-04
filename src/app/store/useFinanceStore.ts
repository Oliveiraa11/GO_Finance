import { useContext } from 'react'
import { FinanceStoreContext } from './finance-store-context'

export function useFinanceStore() {
  const store = useContext(FinanceStoreContext)
  if (!store) throw new Error('useFinanceStore must be used within FinanceStoreProvider')
  return store
}
