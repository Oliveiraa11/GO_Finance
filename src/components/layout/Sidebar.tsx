import { LayoutDashboard, Lightbulb, ReceiptText, Settings, WalletCards } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useFinanceStore } from '../../app/store/useFinanceStore'
import { cn } from '../../lib/cn'
import { Brand } from './Brand'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transacoes', label: 'Transações', icon: ReceiptText },
  { to: '/orcamentos', label: 'Orçamentos', icon: WalletCards },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
]

export function Sidebar() {
  const { profile } = useFinanceStore()
  const initials = profile.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  return <aside className="fixed inset-y-0 left-0 hidden w-52 flex-col border-r border-border bg-[#080d12] p-5 lg:flex"><Brand /><nav className="mt-8 flex flex-col gap-1">{items.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => cn('focus-ring flex h-10 items-center gap-3 rounded-control px-3 text-[13px] text-muted transition hover:bg-surface-interactive hover:text-text', isActive && 'bg-primary text-[#06220f]')}><Icon size={19} />{label}</NavLink>)}</nav><div className="mt-auto border-t border-border pt-4"><NavLink to="/configuracoes" className="flex h-10 items-center gap-3 rounded-control px-3 text-[13px] text-muted hover:bg-surface-interactive hover:text-text"><Settings size={19} />Configurações</NavLink><div className="mt-3 flex items-center gap-3 px-1 py-2"><span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-gradient-to-br from-slate-500 to-slate-900 text-[10px] font-semibold">{initials}</span><div><p className="m-0 text-xs font-medium">{profile.name}</p><p className="mt-0.5 text-[10px] text-muted">Conta pessoal</p></div></div></div></aside>
}
