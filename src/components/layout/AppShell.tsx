import { Bell, CalendarDays, Plus } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Brand } from './Brand'
import { MobileBottomNavigation } from './MobileBottomNavigation'
import { Sidebar } from './Sidebar'

export function AppShell() {
  return <div className="min-h-screen bg-canvas text-text"><Sidebar /><div className="lg:pl-52"><header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-canvas/95 px-4 backdrop-blur sm:px-6 lg:h-20"><div className="lg:hidden"><Brand /></div><div className="hidden items-center gap-3 lg:flex"><span className="grid size-8 place-items-center rounded-control border border-primary/20 bg-primary/8 text-[9px] font-semibold text-primary">GO</span><div><p className="text-sm font-semibold">Olá, Gustavo 👋</p><p className="mt-0.5 text-[11px] text-muted">Aqui está o resumo das suas finanças.</p></div></div><div className="flex items-center gap-2.5"><button className="focus-ring hidden h-9 items-center gap-2 rounded-control border border-border bg-surface-interactive px-3 text-xs text-text sm:flex"><CalendarDays size={16} className="text-muted" />Setembro 2026</button><button aria-label="Notificações" className="focus-ring relative grid size-9 place-items-center rounded-control border border-border bg-surface-interactive text-muted"><Bell size={17} /><span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary" /></button><Button className="hidden h-9 sm:inline-flex" onClick={() => window.dispatchEvent(new Event('go-finance:open-transaction-drawer'))}><Plus size={17} />Nova transação</Button><span className="hidden size-8 place-items-center rounded-full border border-border bg-gradient-to-br from-slate-500 to-slate-900 text-[9px] font-semibold sm:grid">GO</span></div></header><main className="w-full px-4 py-6 pb-24 sm:px-6 lg:px-6 lg:pb-8"><Outlet /></main></div><MobileBottomNavigation /></div>
}
