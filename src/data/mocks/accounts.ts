import type { Account } from '../../types/finance'

// Accounts classify transaction origin only. V1 deliberately has no per-account balance.
export const accounts: Account[] = [
  { id: 'nubank', name: 'Nubank' },
  { id: 'checking', name: 'Conta corrente' },
  { id: 'cash', name: 'Dinheiro' },
]
