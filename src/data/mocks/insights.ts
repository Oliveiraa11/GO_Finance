import {
  CarFront,
  ChartPie,
  PiggyBank,
  ShoppingBag,
  Tickets,
  Utensils,
  type LucideIcon,
} from 'lucide-react'

export type InsightTone = 'positive' | 'warning' | 'danger' | 'neutral'

export interface MonthlyMetric {
  label: string
  value: string
  change: string
  direction: 'up' | 'down'
  comparison: string
  icon: 'expenses' | 'savings' | 'rate'
}

export interface MonthlyInsightCardData {
  id: string
  category: string
  title: string
  description: string
  status: string
  tone: InsightTone
  icon: LucideIcon
  meta?: string
  detailLabel?: string
  detailValue?: string
  progress?: number
  progressSecondary?: number
  footerLeft?: string
  footerRight?: string
  action?: string
}

export const monthlyInsightSummary = {
  month: 'Setembro 2026',
  label: 'Resumo de setembro',
  title: 'Você está gastando menos e economizando mais.',
  descriptionStart: 'Suas despesas diminuíram',
  expenseChange: '12%',
  descriptionMiddle: 'em relação a agosto e sua taxa de economia pessoal atingiu',
  savingsRate: '40,3%',
  descriptionEnd: 'da renda total consolidada.',
  highlights: [
    { label: 'Nas despesas', value: '12,0%', helper: '-R$ 472,30 vs. mês ant.', direction: 'down' as const },
    { label: 'De economia', value: '40,3%', helper: 'R$ 2.340,50 poupados', direction: 'up' as const },
  ],
}

export const monthlyMetrics: MonthlyMetric[] = [
  { label: 'Despesas', value: 'R$ 3.459,50', change: '12,0%', direction: 'down', comparison: 'vs. agosto', icon: 'expenses' },
  { label: 'Economia', value: 'R$ 2.340,50', change: '18,4%', direction: 'up', comparison: 'vs. agosto', icon: 'savings' },
  { label: 'Taxa de economia', value: '40,3%', change: '6,2 p.p.', direction: 'up', comparison: 'vs. agosto', icon: 'rate' },
]

export const insightCards: MonthlyInsightCardData[] = [
  {
    id: 'food-drop', category: 'Alimentação', icon: Utensils, tone: 'positive', status: 'Economia',
    title: 'Você gastou menos com alimentação.',
    description: 'Seus gastos caíram 18% comparados ao mês passado com disciplina em refeições fora.',
    meta: 'R$ 820 em set  ·  R$ 1.000 em ago', detailLabel: 'Economia gerada', detailValue: 'R$ 180,00',
  },
  {
    id: 'transport-rise', category: 'Transporte', icon: CarFront, tone: 'warning', status: '↑ 18,2%',
    title: 'Seus gastos com transporte aumentaram.',
    description: 'Você gastou R$ 94 a mais que em agosto, puxado por viagens via app em fins de semana.',
    meta: 'Setembro: R$ 610  ·  Agosto: R$ 516', detailLabel: 'Variação nominal', detailValue: '+R$ 94,00',
  },
  {
    id: 'restaurant-share', category: 'Alimentação', icon: ChartPie, tone: 'neutral', status: 'Composição',
    title: 'Restaurantes representam a maior fatia.',
    description: '62% dos gastos da categoria vieram de restaurantes e delivery durante a semana.',
    progress: 62, progressSecondary: 38, footerLeft: 'Restaurantes R$ 508 (62%)', footerRight: 'Mercado R$ 312 (38%)',
  },
  {
    id: 'leisure-budget', category: 'Orçamentos', icon: Tickets, tone: 'warning', status: '84% usado',
    title: 'Lazer está próximo do limite.',
    description: 'Você já utilizou 84% do teto mensal estipulado para entretenimento e eventos.',
    progress: 84, footerLeft: 'R$ 420 de R$ 500', footerRight: 'Restante: R$ 80', action: 'Ver orçamento',
  },
  {
    id: 'shopping-budget', category: 'Compras', icon: ShoppingBag, tone: 'danger', status: '116% estourado',
    title: 'Você ultrapassou seu orçamento de compras.',
    description: 'O limite definido era R$ 500 e seus gastos consolidados alcançaram R$ 580.',
    progress: 100, footerLeft: 'Limite: R$ 500', footerRight: 'R$ 80 acima do limite', action: 'Ver transações',
  },
  {
    id: 'savings-improved', category: 'Economia', icon: PiggyBank, tone: 'positive', status: '+8,5 p.p.',
    title: 'Sua capacidade de economizar melhorou.',
    description: 'Você guardou uma parcela maior da sua renda líquida neste mês que em agosto.',
    footerLeft: 'Ago: 31,8%', footerRight: 'Set: 40,3%', detailLabel: 'Diferença relativa', detailValue: '+8,5 p.p.',
  },
]

export const spendingRanking = {
  total: 'R$ 3.459,50',
  categories: [
    { name: 'Alimentação', value: 'R$ 820,00', percentage: 24 },
    { name: 'Transporte', value: 'R$ 610,00', percentage: 18 },
    { name: 'Educação', value: 'R$ 550,00', percentage: 16 },
    { name: 'Lazer', value: 'R$ 430,00', percentage: 13 },
    { name: 'Saúde', value: 'R$ 310,00', percentage: 9 },
  ],
}

export const monthlyComparison = [
  { label: 'Receitas', value: '+4,3%', direction: 'up' as const },
  { label: 'Despesas', value: '-12,0%', direction: 'down' as const },
  { label: 'Economia', value: '+18,4%', direction: 'up' as const },
]

export const insightConclusion = {
  title: 'Mantendo esse ritmo...',
  description: 'Você deve terminar setembro confortavelmente dentro dos seus principais orçamentos e com uma taxa de reserva superior à de agosto, fortalecendo seu fundo de segurança.',
  status: 'Projeção favorável para fechamento mensal',
}
