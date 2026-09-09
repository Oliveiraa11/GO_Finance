export type BudgetStatus = 'primary' | 'warning' | 'danger'

export function getBudgetStatus(percentage: number, alertAt = 80): BudgetStatus {
  if (percentage > 100) return 'danger'
  if (percentage >= alertAt) return 'warning'
  return 'primary'
}
