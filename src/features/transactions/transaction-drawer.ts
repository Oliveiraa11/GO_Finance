import type { Transaction } from '../../types/finance'

export const TRANSACTION_DRAWER_EVENT = 'go-finance:open-transaction-drawer'

export function openTransactionDrawer(transaction?: Transaction) {
  window.dispatchEvent(new CustomEvent<Transaction | null>(TRANSACTION_DRAWER_EVENT, { detail: transaction ?? null }))
}
