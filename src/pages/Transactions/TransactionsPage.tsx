import { ArrowDown, ArrowUp, Landmark, MoreVertical, Plus, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useFinanceStore } from '../../app/store/useFinanceStore'
import { CategoryIcon } from '../../components/finance/CategoryIcon'
import { Button } from '../../components/ui/Button'
import { openTransactionDrawer } from '../../features/transactions/transaction-drawer'
import { formatCurrency } from '../../lib/formatters'
import type { Transaction } from '../../types/finance'

const PAGE_SIZE = 7

export function TransactionsPage() {
  const { transactions, categories, paymentMethods, duplicateTransaction, removeTransaction } = useFinanceStore()
  const [search, setSearch] = useState('')
  const [kind, setKind] = useState('all')
  const [category, setCategory] = useState('all')
  const [account, setAccount] = useState('all')
  const [page, setPage] = useState(1)
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const filtered = useMemo(() => transactions.filter((transaction) =>
    transaction.description.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR')) &&
    (kind === 'all' || transaction.kind === kind) && (category === 'all' || transaction.categoryId === category) &&
    (account === 'all' || transaction.accountId === account)
  ), [transactions, search, kind, category, account])
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const income = transactions.filter((t) => t.kind === 'income').reduce((sum, t) => sum + t.amount, 0)
  const expenses = transactions.filter((t) => t.kind === 'expense').reduce((sum, t) => sum + t.amount, 0)

  function edit(transaction: Transaction) { openTransactionDrawer(transaction); setOpenMenu(null) }
  function duplicate(transaction: Transaction) { duplicateTransaction(transaction); setOpenMenu(null); setPage(1) }
  function remove(id: string) { removeTransaction(id); setOpenMenu(null) }

  return <div className="space-y-4">
    <header className="flex items-center justify-between"><div><h1 className="text-[28px] font-semibold tracking-tight">Transações</h1><p className="mt-1 text-sm text-muted">Acompanhe todas as suas movimentações financeiras com precisão.</p></div><Button onClick={() => openTransactionDrawer()}><Plus size={17} />Nova transação</Button></header>
    <section className="grid grid-cols-3 gap-4 rounded-card bg-surface p-3">
      <Summary label="Receitas do mês" value={income} icon={<ArrowDown size={17} />} tone="positive" badge="+12,4%" />
      <Summary label="Despesas do mês" value={expenses} icon={<ArrowUp size={17} />} tone="negative" badge="-4,1%" />
      <Summary label="Saldo líquido" value={income - expenses} icon={<Landmark size={17} />} tone="neutral" badge="Consolidado" />
    </section>
    <section className="flex items-center gap-3 rounded-card bg-surface p-3">
      <label className="relative min-w-64 max-w-xs flex-1"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} placeholder="Buscar por descrição..." className="control pl-9" /></label>
      <Filter value={kind} onChange={(value) => { setKind(value); setPage(1) }}><option value="all">Todos os tipos</option><option value="expense">Despesas</option><option value="income">Receitas</option></Filter>
      <Filter value={category} onChange={(value) => { setCategory(value); setPage(1) }}><option value="all">Todas as categorias</option>{categories.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Filter>
      <Filter value={account} onChange={(value) => { setAccount(value); setPage(1) }}><option value="all">Todas as contas</option>{paymentMethods.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</Filter>
      {(search || kind !== 'all' || category !== 'all' || account !== 'all') && <button onClick={() => { setSearch(''); setKind('all'); setCategory('all'); setAccount('all'); setPage(1) }} className="text-xs font-medium text-primary">Limpar</button>}
    </section>
    <section className="overflow-visible rounded-card bg-surface">
      <div className="grid grid-cols-12 gap-3 border-b border-border px-5 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted"><span className="col-span-4">Descrição</span><span className="col-span-2">Categoria</span><span className="col-span-2">Data</span><span className="col-span-2">Conta / pagamento</span><span className="col-span-2 text-right">Valor</span></div>
      <div>{visible.length ? visible.map((transaction) => {
        const categoryItem = categories.find((item) => item.id === transaction.categoryId)
        const accountItem = paymentMethods.find((item) => item.id === transaction.accountId)
        return <div key={transaction.id} className="group relative grid min-h-[62px] grid-cols-12 items-center gap-3 border-b border-border/80 px-5 py-2.5 last:border-0 hover:bg-surface-interactive/60">
          <div className="col-span-4 flex min-w-0 items-center gap-3"><CategoryIcon color={categoryItem?.color} /><div className="min-w-0"><p className="truncate text-sm font-medium">{transaction.description}</p><p className="mt-0.5 truncate text-[11px] text-muted">{transaction.note ?? (transaction.kind === 'income' ? 'Entrada registrada' : 'Pagamento realizado')}</p></div></div>
          <div className="col-span-2"><span className="inline-flex rounded-full bg-canvas px-2.5 py-1 text-[11px]">{categoryItem?.name ?? 'Sem categoria'}</span></div>
          <span className="col-span-2 text-xs text-muted">{new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${transaction.date.slice(0, 10)}T00:00:00Z`))}</span>
          <span className="col-span-2 flex items-center gap-2 truncate text-xs"><i className="size-2 rounded-full bg-primary/70" />{accountItem?.name ?? 'Outro'}</span>
          <div className="col-span-2 flex items-center justify-end gap-2"><span className={`tabular whitespace-nowrap text-sm font-semibold ${transaction.kind === 'income' ? 'text-primary' : 'text-text'}`}>{transaction.kind === 'income' ? '+ ' : '- '}{formatCurrency(transaction.amount)}</span><button onClick={() => setOpenMenu(openMenu === transaction.id ? null : transaction.id)} aria-label={`Ações de ${transaction.description}`} className="focus-ring grid size-7 place-items-center rounded text-muted hover:bg-canvas hover:text-text"><MoreVertical size={17} /></button></div>
          {openMenu === transaction.id && <div className="absolute right-4 top-12 z-20 w-36 rounded-control border border-border-strong bg-surface-interactive p-1 text-xs shadow-xl"><button onClick={() => edit(transaction)} className="menu-item">Editar</button><button onClick={() => duplicate(transaction)} className="menu-item">Duplicar</button><button onClick={() => remove(transaction.id)} className="menu-item text-danger">Excluir</button></div>}
        </div>
      }) : <div className="grid min-h-52 place-items-center text-sm text-muted">Nenhuma transação encontrada.</div>}</div>
      <footer className="flex items-center justify-between rounded-b-card bg-surface-interactive/50 px-5 py-3 text-xs text-muted"><span>Mostrando <strong className="text-text">{filtered.length ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, filtered.length)}</strong> de <strong className="text-text">{filtered.length}</strong> transações</span><div className="flex items-center gap-1"><button disabled={page === 1} onClick={() => setPage(page - 1)} className="page-button px-3">Anterior</button>{Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => <button key={number} onClick={() => setPage(number)} className={`page-button w-8 ${page === number ? 'bg-primary !text-canvas' : ''}`}>{number}</button>)}<button disabled={page === pageCount} onClick={() => setPage(page + 1)} className="page-button px-3">Próxima</button></div></footer>
    </section>
  </div>
}

function Summary({ label, value, icon, tone, badge }: { label: string; value: number; icon: React.ReactNode; tone: 'positive' | 'negative' | 'neutral'; badge: string }) {
  const color = tone === 'positive' ? 'text-primary' : tone === 'negative' ? 'text-danger' : 'text-text'
  return <div className="flex items-center justify-between rounded-control bg-surface-interactive px-4 py-2"><div className="flex items-center gap-2.5"><span className={`grid size-8 place-items-center rounded-control bg-canvas ${color}`}>{icon}</span><div><p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p><p className={`tabular mt-0.5 text-sm font-semibold ${color}`}>{formatCurrency(value)}</p></div></div><span className={`rounded px-2 py-0.5 text-[10px] ${tone === 'neutral' ? 'bg-border text-muted' : `${color} bg-canvas`}`}>{badge}</span></div>
}

function Filter({ value, onChange, children }: { value: string; onChange: (value: string) => void; children: React.ReactNode }) {
  return <select value={value} onChange={(e) => onChange(e.target.value)} className="control w-auto min-w-36">{children}</select>
}
