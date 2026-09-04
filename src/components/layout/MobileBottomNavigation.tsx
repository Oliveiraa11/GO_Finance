import { LayoutDashboard, Lightbulb, ReceiptText, WalletCards } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../lib/cn'

const items = [
  { to: '/dashboard', label: 'Início', icon: LayoutDashboard },
  { to: '/transacoes', label: 'Transações', icon: ReceiptText },
  { to: '/orcamentos', label: 'Orçamentos', icon: WalletCards },
  { to: '/insights', label: 'Insights', icon: Lightbulb },
]

export function MobileBottomNavigation() {
  return <nav className="fixed inset-x-0 bottom-0 z-50 grid h-17 grid-cols-4 border-t border-border bg-surface lg:hidden">{items.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} className={({ isActive }) => cn('flex flex-col items-center justify-center gap-1 text-[11px] text-muted', isActive && 'text-primary')}><Icon size={20} /><span>{label}</span></NavLink>)}</nav>
}
