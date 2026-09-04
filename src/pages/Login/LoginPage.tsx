import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, TrendingUp, User } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Brand } from '../../components/layout/Brand'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'

interface LoginErrors { email?: string; password?: string }
interface SignupErrors extends LoginErrors { name?: string; confirmation?: string }

export function LoginPage() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('gustavo@email.com')
  const [password, setPassword] = useState('go-finance')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [signup, setSignup] = useState({ name: '', email: '', password: '', confirmation: '' })
  const [signupErrors, setSignupErrors] = useState<SignupErrors>({})

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: LoginErrors = {}
    if (!email.trim()) nextErrors.email = 'Informe seu e-mail.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = 'Informe um e-mail válido.'
    if (!password) nextErrors.password = 'Informe sua senha.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) navigate('/dashboard')
  }

  function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: SignupErrors = {}
    if (!signup.name.trim()) nextErrors.name = 'Informe seu nome.'
    if (!signup.email.trim()) nextErrors.email = 'Informe seu e-mail.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signup.email)) nextErrors.email = 'Informe um e-mail válido.'
    if (!signup.password) nextErrors.password = 'Crie uma senha.'
    if (!signup.confirmation) nextErrors.confirmation = 'Confirme sua senha.'
    else if (signup.password !== signup.confirmation) nextErrors.confirmation = 'As senhas não coincidem.'
    setSignupErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) navigate('/dashboard')
  }

  function updateSignup(field: keyof typeof signup, value: string) {
    setSignup((current) => ({ ...current, [field]: value }))
    setSignupErrors((current) => ({ ...current, [field]: undefined }))
  }

  return <main className="min-h-screen bg-[#080b0f] text-text lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(460px,5fr)]">
    <section className="relative hidden min-h-screen overflow-hidden border-r border-[#1a212a] px-12 py-12 lg:flex lg:flex-col xl:px-20 xl:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_45%,rgba(34,197,94,.08),transparent_45%)]" />
      <div className="relative z-10"><Brand /></div>
      <div className="relative z-10 my-auto max-w-[560px] py-10">
        <h1 className="text-[56px] font-bold leading-[1.08] tracking-[-.045em] xl:text-[64px]">Seu dinheiro.<br /><span className="bg-gradient-to-r from-primary to-emerald-200 bg-clip-text text-transparent">Mais claro.</span></h1>
        <p className="mt-7 max-w-[500px] text-lg leading-8 text-muted xl:text-xl">Controle seus gastos, acompanhe seus limites e entenda melhor para onde seu dinheiro está indo.</p>
        <div className="mt-16 max-w-[640px] space-y-4">
          <Card className="max-w-[480px] border-primary/35 bg-[#10151c]/90 p-5 shadow-[0_0_28px_-12px_rgba(34,197,94,.35)]">
            <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted"><i className="grid size-7 place-items-center rounded bg-primary/10 text-primary"><TrendingUp size={15} /></i>Economia este mês</span><span className="rounded border border-primary/25 bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">↑ 18,4%</span></div>
            <div className="mt-3 flex items-end justify-between"><strong className="tabular text-[30px] tracking-tight">R$ 2.340,50</strong><span className="pb-1 text-xs text-muted">vs. mês anterior</span></div>
          </Card>
          <div className="grid max-w-[640px] grid-cols-2 gap-4"><MetricCard title="Orçamento mensal" value="70% utilizado" left="R$ 2.670 gastos" right="R$ 1.130 livre" percent={70} /><MetricCard title="●  Alimentação" value="69%" left="R$ 620 de R$ 900" right="R$ 280 disp." percent={69} /></div>
        </div>
      </div>
      <footer className="relative z-10 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted"><span>Controle <b className="mx-2 text-primary/60">•</b> Clareza <b className="mx-2 text-primary/60">•</b> Decisão</span><span className="font-mono font-medium">Sistema de precisão capital</span></footer>
    </section>

    <section className="relative flex min-h-screen flex-col bg-[#090d12] px-6 py-8 sm:px-12 lg:px-14 xl:px-16">
      <div className="mb-12 lg:hidden"><Brand /></div>
      <div className="my-auto w-full max-w-md self-center">
        <div className="mb-9"><p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"><span className="size-1.5 rounded-full bg-primary" />{mode === 'login' ? 'Acesso seguro à plataforma' : 'Cadastro seguro e gratuito'}</p><h2 className="text-3xl font-bold tracking-tight">{mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2><p className="mt-3 text-sm text-muted">{mode === 'login' ? 'Entre na sua conta para continuar gerenciando suas finanças.' : 'Comece agora a organizar suas finanças com mais clareza.'}</p></div>
        {mode === 'login' ? <><form noValidate onSubmit={submit} className="space-y-5">
          <Field label="E-mail" error={errors.email}><div className="group relative"><Mail className="absolute left-3.5 top-[18px] text-slate-500 transition group-focus-within:text-primary" size={17} /><Input id="email" value={email} onChange={(event) => { setEmail(event.target.value); setErrors((current) => ({ ...current, email: undefined })) }} type="email" autoComplete="email" placeholder="seu@email.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'e-mail-error' : undefined} className="h-[52px] bg-[#0e1319] pl-11 pr-4 hover:bg-surface focus:border-primary" /></div></Field>
          <Field label="Senha" error={errors.password}><div className="group relative"><LockKeyhole className="absolute left-3.5 top-[18px] text-slate-500 transition group-focus-within:text-primary" size={17} /><Input id="password" value={password} onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: undefined })) }} type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="••••••••" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'senha-error' : undefined} className="h-[52px] bg-[#0e1319] pl-11 pr-11 hover:bg-surface focus:border-primary" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} aria-pressed={showPassword} className="focus-ring absolute right-3.5 top-[17px] text-slate-500 hover:text-text">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></Field>
          <div className="flex items-center justify-between pt-1 text-xs"><label className="flex cursor-pointer items-center gap-2 text-muted hover:text-text"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} className="size-4 accent-primary" />Lembrar de mim</label><a href="#recuperar-senha" onClick={(event) => event.preventDefault()} className="focus-ring rounded font-medium text-primary hover:text-primary-soft">Esqueci minha senha</a></div>
          <Button type="submit" className="h-[52px] w-full text-[15px]">Entrar <ArrowRight size={18} /></Button>
        </form>
        <p className="mt-9 text-center text-xs text-muted">Ainda não tem uma conta? <button type="button" onClick={() => setMode('signup')} className="focus-ring ml-1 rounded font-semibold text-primary">Criar conta</button></p></> : <SignupForm signup={signup} errors={signupErrors} showPassword={showPassword} onTogglePassword={() => setShowPassword((visible) => !visible)} onChange={updateSignup} onSubmit={submitSignup} onBack={() => { setMode('login'); setSignupErrors({}) }} />}
        <div className="mt-12 flex items-center justify-center gap-3 border-t border-border pt-8 text-[11px] text-slate-500"><ShieldCheck size={16} className="text-emerald-500" />Seus dados financeiros permanecem privados e protegidos.</div>
      </div>
      <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 text-[11px] text-muted"><span>© 2026 GO Finance. Todos os direitos reservados.</span><span>Privacidade <b className="mx-3 text-border-strong">•</b> Termos <b className="mx-3 text-border-strong">•</b> Segurança</span></footer>
    </section>
  </main>
}

function Field({ label, error, children, inputId }: { label: string; error?: string; children: React.ReactNode; inputId?: string }) {
  const id = `${label.toLocaleLowerCase('pt-BR')}-error`
  return <label className="block" htmlFor={inputId ?? (label === 'E-mail' ? 'email' : 'password')}><span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-300">{label}</span>{children}{error && <span id={id} role="alert" className="mt-1.5 block text-xs text-danger">{error}</span>}</label>
}

interface SignupFormProps {
  signup: { name: string; email: string; password: string; confirmation: string }
  errors: SignupErrors
  showPassword: boolean
  onTogglePassword: () => void
  onChange: (field: keyof SignupFormProps['signup'], value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onBack: () => void
}

function SignupForm({ signup, errors, showPassword, onTogglePassword, onChange, onSubmit, onBack }: SignupFormProps) {
  const inputClass = 'h-[48px] bg-[#0e1319] pl-11 pr-4 hover:bg-surface focus:border-primary'
  return <><form noValidate onSubmit={onSubmit} className="space-y-4">
    <Field label="Nome" error={errors.name} inputId="signup-name"><div className="group relative"><User className="absolute left-3.5 top-4 text-slate-500 group-focus-within:text-primary" size={17} /><Input id="signup-name" value={signup.name} onChange={(event) => onChange('name', event.target.value)} autoComplete="name" placeholder="Seu nome completo" aria-invalid={Boolean(errors.name)} className={inputClass} /></div></Field>
    <Field label="E-mail" error={errors.email} inputId="signup-email"><div className="group relative"><Mail className="absolute left-3.5 top-4 text-slate-500 group-focus-within:text-primary" size={17} /><Input id="signup-email" value={signup.email} onChange={(event) => onChange('email', event.target.value)} type="email" autoComplete="email" placeholder="seu@email.com" aria-invalid={Boolean(errors.email)} className={inputClass} /></div></Field>
    <Field label="Senha" error={errors.password} inputId="signup-password"><div className="group relative"><LockKeyhole className="absolute left-3.5 top-4 text-slate-500 group-focus-within:text-primary" size={17} /><Input id="signup-password" value={signup.password} onChange={(event) => onChange('password', event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Crie uma senha" aria-invalid={Boolean(errors.password)} className={`${inputClass} pr-11`} /><button type="button" onClick={onTogglePassword} aria-label={showPassword ? 'Ocultar senhas' : 'Mostrar senhas'} aria-pressed={showPassword} className="focus-ring absolute right-3.5 top-[15px] text-slate-500 hover:text-text">{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></Field>
    <Field label="Confirmar senha" error={errors.confirmation} inputId="signup-confirmation"><div className="group relative"><LockKeyhole className="absolute left-3.5 top-4 text-slate-500 group-focus-within:text-primary" size={17} /><Input id="signup-confirmation" value={signup.confirmation} onChange={(event) => onChange('confirmation', event.target.value)} type={showPassword ? 'text' : 'password'} autoComplete="new-password" placeholder="Repita sua senha" aria-invalid={Boolean(errors.confirmation)} className={inputClass} /></div></Field>
    <Button type="submit" className="h-[52px] w-full text-[15px]">Criar conta <ArrowRight size={18} /></Button>
  </form><button type="button" onClick={onBack} className="focus-ring mx-auto mt-7 flex items-center gap-2 rounded text-xs font-medium text-primary"><ArrowLeft size={15} />Voltar para o login</button></>
}

function MetricCard({ title, value, left, right, percent }: { title: string; value: string; left: string; right: string; percent: number }) {
  const category = title.startsWith('●')
  return <Card className="bg-[#101419]/90 p-4"><div className="flex justify-between text-xs"><span className={category ? 'text-text' : 'text-muted'}>{title}</span><strong className={category ? 'text-muted' : 'text-primary'}>{value}</strong></div><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#202833]"><div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} /></div><div className="mt-3 flex justify-between text-[11px] text-muted"><span>{left}</span><strong className={category ? 'text-primary' : 'text-text'}>{right}</strong></div></Card>
}
