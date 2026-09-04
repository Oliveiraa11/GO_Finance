import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface SettingsModalProps {
  open: boolean
  title: string
  eyebrow: string
  description?: string
  children: ReactNode
  footer: ReactNode
  onClose: () => void
}

export function SettingsModal({ open, title, eyebrow, description, children, footer, onClose }: SettingsModalProps) {
  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas/85 p-6 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="w-full max-w-md rounded-card border border-border-strong bg-surface p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="settings-dialog-title">
      <header className="flex items-start justify-between gap-4 border-b border-border pb-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.08em] text-primary">{eyebrow}</p><h2 id="settings-dialog-title" className="mt-1 text-xl font-semibold">{title}</h2>{description && <p className="mt-1 text-xs leading-5 text-muted">{description}</p>}</div><button aria-label="Fechar" className="focus-ring grid size-8 shrink-0 place-items-center rounded-control text-muted hover:bg-surface-interactive hover:text-text" onClick={onClose}><X size={18} /></button></header>
      <div className="py-5">{children}</div>
      <footer className="flex justify-end gap-2 border-t border-border pt-4">{footer}</footer>
    </section>
  </div>
}
