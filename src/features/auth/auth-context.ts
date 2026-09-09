import { createContext } from 'react'

export interface AuthUser { id: string; name: string; email: string }
export type AuthResult = { ok: true } | { ok: false; field: 'email' | 'password'; message: string }

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string, persistent: boolean) => AuthResult
  signup: (input: { name: string; email: string; password: string }) => AuthResult
  logout: () => void
  updateUser: (input: { name: string; email: string }) => AuthResult
}

export const AuthContext = createContext<AuthContextValue | null>(null)
