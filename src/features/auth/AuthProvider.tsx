import { useMemo, useState, type PropsWithChildren } from 'react'
import { AuthContext, type AuthUser } from './auth-context'
import { clearSession, loadSessionUserId, loadUsers, writeSessionUserId, writeUsers, type LocalAuthUser } from './mock-auth-storage'

export function AuthProvider({ children }: PropsWithChildren) {
  const [users, setUsers] = useState<LocalAuthUser[]>(loadUsers)
  const [sessionUserId, setSessionUserId] = useState<string | null>(loadSessionUserId)
  const sessionUser = users.find((candidate) => candidate.id === sessionUserId) ?? null
  const user: AuthUser | null = sessionUser ? toPublicUser(sessionUser) : null

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    login(email: string, password: string, persistent: boolean) {
      const account = users.find((candidate) => candidate.email === normalizeEmail(email))
      if (!account) return { ok: false as const, field: 'email' as const, message: 'Não existe uma conta com este e-mail.' }
      if (account.password !== password) return { ok: false as const, field: 'password' as const, message: 'Senha incorreta.' }
      writeSessionUserId(account.id, persistent)
      setSessionUserId(account.id)
      return { ok: true as const }
    },
    signup(input: { name: string; email: string; password: string }) {
      const email = normalizeEmail(input.email)
      if (users.some((candidate) => candidate.email === email)) return { ok: false as const, field: 'email' as const, message: 'Já existe uma conta com este e-mail.' }
      const account = { id: crypto.randomUUID(), name: input.name.trim(), email, password: input.password }
      const nextUsers = [...users, account]
      writeUsers(nextUsers)
      writeSessionUserId(account.id, true)
      setUsers(nextUsers)
      setSessionUserId(account.id)
      return { ok: true as const }
    },
    logout() {
      clearSession()
      setSessionUserId(null)
    },
    updateUser(input: { name: string; email: string }) {
      if (!sessionUserId) return { ok: false as const, field: 'email' as const, message: 'Não há uma sessão ativa.' }
      const email = normalizeEmail(input.email)
      if (users.some((candidate) => candidate.id !== sessionUserId && candidate.email === email)) return { ok: false as const, field: 'email' as const, message: 'Este e-mail já está sendo utilizado por outra conta.' }
      const nextUsers = users.map((candidate) => candidate.id === sessionUserId ? { ...candidate, name: input.name.trim(), email } : candidate)
      writeUsers(nextUsers)
      setUsers(nextUsers)
      return { ok: true as const }
    },
  }), [sessionUserId, user, users])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function normalizeEmail(email: string) { return email.trim().toLocaleLowerCase('pt-BR') }
function toPublicUser({ id, name, email }: LocalAuthUser): AuthUser { return { id, name, email } }
