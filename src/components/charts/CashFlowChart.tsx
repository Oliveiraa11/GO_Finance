import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export function CashFlowChart({ data }: { data: Array<{ key: string; month: string; income: number; expenses: number }> }) {
  return <div className="h-[245px] min-w-0 w-full overflow-hidden"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 14, right: 10, left: -10, bottom: 2 }}><defs><linearGradient id="income" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} /><stop offset="95%" stopColor="#22c55e" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#222b36" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#222b36' }} tickMargin={12} /><YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value: number) => `R$ ${value / 1000}k`} /><Tooltip formatter={(value) => [formatTooltipValue(value), '']} contentStyle={{ background: '#171e27', border: '1px solid #2e3a49', borderRadius: 8, fontSize: 12 }} /><Area type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={2.5} fill="url(#income)" /><Area type="monotone" dataKey="expenses" stroke="#94a3b8" strokeWidth={2} fill="transparent" /></AreaChart></ResponsiveContainer></div>
}

function formatTooltipValue(value: unknown) {
  return typeof value === 'number' ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value) : String(value)
}
