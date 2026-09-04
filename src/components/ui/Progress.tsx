interface ProgressProps { value: number; tone?: 'primary' | 'warning' | 'danger' }
const tones = { primary: 'bg-primary', warning: 'bg-warning', danger: 'bg-danger' }

export function Progress({ value, tone = 'primary' }: ProgressProps) {
  const normalized = Math.min(100, Math.max(0, value))
  return <div className="h-2 overflow-hidden rounded-full bg-surface-interactive" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={normalized}><div className={`h-full rounded-full ${tones[tone]}`} style={{ width: `${normalized}%` }} /></div>
}
