import type { Budget, Transaction } from '../../types/finance'

export type RemovalResult = { ok: true } | { ok: false; message: string }

export function validateCategoryRemoval(categoryId: string, transactions: Transaction[], budgets: Budget[]): RemovalResult {
  const transactionCount = transactions.filter((transaction) => transaction.categoryId === categoryId).length
  const budgetCount = budgets.filter((budget) => budget.categoryId === categoryId).length
  if (transactionCount === 0 && budgetCount === 0) return { ok: true }
  const dependencies = [
    transactionCount > 0 ? `${transactionCount} ${transactionCount === 1 ? 'transação' : 'transações'}` : '',
    budgetCount > 0 ? `${budgetCount} ${budgetCount === 1 ? 'orçamento' : 'orçamentos'}` : '',
  ].filter(Boolean).join(' e ')
  return { ok: false, message: `Esta categoria está sendo utilizada por ${dependencies}. Altere esses registros antes de excluí-la.` }
}

export function validatePaymentMethodRemoval(paymentMethodId: string, transactions: Transaction[]): RemovalResult {
  const transactionCount = transactions.filter((transaction) => transaction.accountId === paymentMethodId).length
  if (transactionCount === 0) return { ok: true }
  return { ok: false, message: `Esta forma de pagamento está sendo utilizada por ${transactionCount} ${transactionCount === 1 ? 'transação' : 'transações'}. Altere esses registros antes de excluí-la.` }
}
