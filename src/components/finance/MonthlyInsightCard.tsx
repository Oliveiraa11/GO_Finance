import { ArrowRight } from 'lucide-react'
import type { MonthlyInsightCardData } from '../../data/mocks/insights'
import { cn } from '../../lib/cn'
import { Progress } from '../ui/Progress'

const toneStyles = {
  positive: { badge: 'bg-primary/10 text-primary', value: 'text-primary', progress: 'primary' as const },
  warning: { badge: 'bg-warning/15 text-warning', value: 'text-warning', progress: 'warning' as const },
  danger: { badge: 'bg-danger/15 text-danger', value: 'text-danger', progress: 'danger' as const },
  neutral: { badge: 'bg-surface-interactive text-text', value: 'text-muted', progress: 'primary' as const },
}

export function MonthlyInsightCard({ insight }: { insight: MonthlyInsightCardData }) {
  const styles = toneStyles[insight.tone]
  const Icon = insight.icon

  return <article className="flex min-h-[228px] flex-col justify-between gap-4 rounded-card border border-border bg-surface p-5 transition-colors hover:bg-surface-interactive/45">
    <div>
      <div className="mb-3 flex items-center justify-between gap-3 text-[11px]">
        <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-medium', styles.badge)}><Icon size={13} />{insight.category}</span>
        <span className={cn('tabular font-medium', styles.value)}>{insight.status}</span>
      </div>
      <h3 className="text-base font-medium leading-snug">{insight.title}</h3>
      <p className="mt-2 text-xs leading-5 text-muted">{insight.description}</p>
    </div>
    <div className="space-y-3">
      {insight.meta && <p className="tabular text-[11px] text-muted">{insight.meta}</p>}
      {insight.progress !== undefined && <div className="flex h-2 overflow-hidden rounded-full bg-surface-interactive">
        <div className={cn('h-full', insight.tone === 'danger' ? 'bg-danger' : insight.tone === 'warning' ? 'bg-warning' : 'bg-primary')} style={{ width: `${insight.progress}%` }} />
        {insight.progressSecondary !== undefined && <div className="h-full bg-muted/55" style={{ width: `${insight.progressSecondary}%` }} />}
      </div>}
      {(insight.footerLeft || insight.footerRight) && <div className="flex items-center justify-between gap-3 text-[11px]"><span className="tabular text-muted">{insight.footerLeft}</span><span className={cn('tabular text-right font-medium', styles.value)}>{insight.footerRight}</span></div>}
      {(insight.detailLabel || insight.detailValue) && <div className="flex items-center justify-between rounded-control bg-surface-interactive px-3 py-2 text-[11px]"><span className="text-muted">{insight.detailLabel}</span><strong className={cn('tabular text-sm', styles.value)}>{insight.detailValue}</strong></div>}
      {insight.action && <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary">{insight.action}<ArrowRight size={13} /></span>}
      {insight.progress !== undefined && insight.progressSecondary === undefined && <span className="sr-only"><Progress value={insight.progress} tone={styles.progress} /></span>}
    </div>
  </article>
}
