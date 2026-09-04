import { ArrowDown, ArrowUp, X } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useFinanceStore } from '../../app/store/useFinanceStore'
import type { Transaction, TransactionKind } from '../../types/finance'

export type TransactionDraft = Omit<Transaction, 'id' | 'dateLabel'>

interface TransactionFormProps {
  transaction?: Transaction | null
  onCancel: () => void
  onSubmit: (draft: TransactionDraft) => void
}

const today = '2026-09-04'

function toCurrencyInput(value: number) {
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function parseCurrency(value: string) {
  return Number(value.replace(/\./g, '').replace(',', '.')) || 0
}

export function TransactionForm({ transaction, onCancel, onSubmit }: TransactionFormProps) {
  const { categories, paymentMethods } = useFinanceStore()
  const amountRef = useRef<HTMLInputElement>(null)
  const [kind, setKind] = useState<TransactionKind>(transaction?.kind ?? 'expense')
  const [amount, setAmount] = useState(transaction ? toCurrencyInput(transaction.amount) : '')
  const [description, setDescription] = useState(transaction?.description ?? '')
  const [categoryId, setCategoryId] = useState(transaction?.categoryId ?? '')
  const [date, setDate] = useState(transaction?.date.slice(0, 10) ?? today)
  const [accountId, setAccountId] = useState(transaction?.accountId ?? 'nubank')
  const [note, setNote] = useState(transaction?.note ?? '')
  const [error, setError] = useState('')

  useEffect(() => { amountRef.current?.focus() }, [])

  function submit(event: FormEvent) {
    event.preventDefault()
    const parsedAmount = parseCurrency(amount)
    if (!parsedAmount || !description.trim() || !categoryId || !date || !accountId) {
      setError('Preencha valor, descrição, categoria, data e conta.')
      return
    }
    onSubmit({ kind, amount: parsedAmount, description: description.trim(), categoryId, date: `${date}T12:00:00`, accountId, note: note.trim() || undefined })
  }

  return <form onSubmit={submit} className="flex min-h-full flex-col">
    <div className="flex-1 space-y-5">
      <div className="flex items-start justify-between"><div><h2 className="text-xl font-semibold">{transaction ? 'Editar transação' : 'Nova transação'}</h2><p className="mt-0.5 text-[11px] text-muted">Insira os detalhes do lançamento fiscal</p></div><button type="button" onClick={onCancel} aria-label="Fechar" className="focus-ring grid size-8 place-items-center rounded-control bg-surface text-muted hover:text-text"><X size={18} /></button></div>
      <div className="flex gap-1 rounded-xl bg-canvas p-1">
        <button type="button" onClick={() => { setKind('expense'); if (categories.find((category) => category.id === categoryId)?.type !== 'expense') setCategoryId('') }} className={`flex h-9 flex-1 items-center justify-center gap-1.5 rounded-control text-sm font-semibold transition ${kind === 'expense' ? 'bg-danger/15 text-red-300' : 'text-muted'}`}><ArrowUp size={16} />Despesa</button>
        <button type="button" onClick={() => { setKind('income'); if (categories.find((category) => category.id === categoryId)?.type !== 'income') setCategoryId('') }} className={`flex h-9 flex-1 items-center justify-center gap-1.5 rounded-control text-sm font-semibold transition ${kind === 'income' ? 'bg-primary/15 text-primary' : 'text-muted'}`}><ArrowDown size={16} />Receita</button>
      </div>
      <label className="block rounded-xl border border-primary/35 bg-surface p-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"><span className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-muted">Valor do lançamento <i className="flex items-center gap-1 text-[10px] normal-case not-italic text-primary"><b className="size-1.5 rounded-full bg-primary" />Ativo</i></span><span className="mt-2 flex items-baseline gap-1 text-primary"><b className="text-base">R$</b><input ref={amountRef} value={amount} onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ''))} inputMode="decimal" placeholder="0,00" aria-label="Valor do lançamento" className="tabular w-full bg-transparent text-2xl font-semibold text-text outline-none placeholder:text-muted" /></span></label>
      <div className="space-y-3">
        <Field label="Descrição"><input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ex: Mercado do Bairro" className="control" /></Field>
        <Field label="Categoria"><select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="control"><option value="">Selecionar categoria</option>{categories.filter((category) => category.type === kind).map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field>
        <div className="grid grid-cols-2 gap-3"><Field label="Data"><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="control" /></Field><Field label="Conta / pagamento"><select value={accountId} onChange={(e) => setAccountId(e.target.value)} className="control">{paymentMethods.map((account) => <option key={account.id} value={account.id}>{account.name}</option>)}</select></Field></div>
        <Field label={<>Observação <span className="font-normal text-muted">(opcional)</span></>}><textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Informações adicionais, tags ou notas fiscais..." className="control h-20 resize-none py-3" /></Field>
        {error && <p role="alert" className="text-xs text-danger">{error}</p>}
      </div>
    </div>
    <div className="mt-6 flex justify-end gap-3 pt-4"><button type="button" onClick={onCancel} className="focus-ring rounded-control px-4 py-2 text-sm font-medium text-muted hover:bg-surface hover:text-text">Cancelar</button><button type="submit" className="focus-ring rounded-control bg-primary px-5 py-2 text-sm font-semibold text-canvas hover:bg-primary-soft">{transaction ? 'Salvar alterações' : 'Adicionar transação'}</button></div>
  </form>
}

function Field({ label, children }: { label: React.ReactNode; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-[11px] font-medium text-muted">{label}</span>{children}</label>
}
