export type BudgetStatus = 'primary' | 'warning' | 'danger'

export function getBudgetStatus(percentage: number): BudgetStatus {
  if (percentage > 100) return 'danger'
  if (percentage > 75) return 'warning'
  return 'primary'
}
