import { Sparkles } from 'lucide-react'
import type { Insight } from '../../types/finance'
import { Card } from '../ui/Card'
import { Progress } from '../ui/Progress'

export function InsightCard({ insight }: { insight: Insight }) {
  return <Card className="bg-gradient-to-br from-primary/8 to-surface p-6"><div className="flex items-center justify-between"><p className="flex items-center gap-2 text-xs font-semibold text-primary"><Sparkles size={15} />GO INSIGHTS</p><span className="text-[10px] text-muted">Inteligência Ativa</span></div><div className="my-4 border-t border-border" /><h2 className="text-lg font-semibold">{insight.title}</h2><p className="mt-2 text-xs leading-5 text-muted">{insight.description}</p>{insight.detailTitle && <div className="mt-5 flex items-center justify-between rounded-control border border-border bg-surface-interactive p-3"><div><p className="text-[10px] font-semibold text-muted">MAIOR REDUÇÃO</p><p className="mt-1 text-xs">{insight.detailTitle}</p></div><span className="rounded-md border border-primary/20 bg-primary/10 px-2 py-1 text-[10px] text-primary">{insight.detailValue}</span></div>}{insight.progress !== undefined && <div className="mt-5 border-t border-border pt-4"><div className="mb-2 flex justify-between text-[10px]"><span className="text-muted">Meta do Fundo de Reserva</span><strong className="text-primary">{insight.progress}% atingida</strong></div><Progress value={insight.progress} /></div>}</Card>
}
