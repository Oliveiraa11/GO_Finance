export type PaymentMethodKind = 'Conta digital' | 'Conta corrente' | 'Dinheiro' | 'Outro'
export type SettingsCategoryType = 'expense' | 'income'

export interface PaymentMethod {
  id: string
  name: string
  kind: PaymentMethodKind
  description: string
  color: string
}

export interface SettingsCategory {
  id: string
  name: string
  type: SettingsCategoryType
  icon: string
  color: string
}

export const profileSettings = {
  name: 'Gustavo Oliveira',
  email: 'gustavo@email.com',
  initials: 'GO',
}

export const paymentMethodMocks: PaymentMethod[] = [
  { id: 'nubank', name: 'Nubank', kind: 'Conta digital', description: 'Cartão e pagamentos digitais', color: '#a855f7' },
  { id: 'checking', name: 'Conta corrente', kind: 'Conta corrente', description: 'Débito e pagamentos bancários', color: '#f97316' },
  { id: 'cash', name: 'Dinheiro', kind: 'Dinheiro', description: 'Pagamentos em espécie', color: '#22c55e' },
  { id: 'other', name: 'Outro', kind: 'Outro', description: 'Outras formas de pagamento', color: '#94a3b8' },
]

export const settingsCategoryMocks: SettingsCategory[] = [
  { id: 'food', name: 'Alimentação', type: 'expense', icon: 'utensils', color: '#fbbf24' },
  { id: 'transport', name: 'Transporte', type: 'expense', icon: 'car', color: '#22c55e' },
  { id: 'housing', name: 'Moradia', type: 'expense', icon: 'house', color: '#4ade80' },
  { id: 'health', name: 'Saúde', type: 'expense', icon: 'heart', color: '#f87171' },
  { id: 'education', name: 'Educação', type: 'expense', icon: 'graduation', color: '#fde68a' },
  { id: 'leisure', name: 'Lazer', type: 'expense', icon: 'gamepad', color: '#c084fc' },
  { id: 'subscriptions', name: 'Assinaturas', type: 'expense', icon: 'calendar', color: '#22c55e' },
  { id: 'shopping', name: 'Compras', type: 'expense', icon: 'shopping', color: '#fbbf24' },
  { id: 'other-expense', name: 'Outros', type: 'expense', icon: 'shapes', color: '#94a3b8' },
  { id: 'salary', name: 'Salário', type: 'income', icon: 'wallet', color: '#22c55e' },
  { id: 'freelance', name: 'Freelance', type: 'income', icon: 'briefcase', color: '#4ade80' },
  { id: 'investments', name: 'Rendimentos', type: 'income', icon: 'trending', color: '#22c55e' },
  { id: 'other-income', name: 'Outras receitas', type: 'income', icon: 'circle-dollar', color: '#94a3b8' },
]

export const preferenceMocks = {
  currency: 'BRL',
  fiscalDay: '1',
  compactMode: false,
  budgetAlerts: true,
}
