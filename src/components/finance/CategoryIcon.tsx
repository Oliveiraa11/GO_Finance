import { CircleDollarSign } from 'lucide-react'

export function CategoryIcon({ color = '#22c55e' }: { color?: string }) {
  return <span className="grid size-9 place-items-center rounded-control border" style={{ color, borderColor: `${color}33`, backgroundColor: `${color}14` }}><CircleDollarSign size={18} /></span>
}
