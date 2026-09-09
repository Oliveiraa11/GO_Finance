import type { PropsWithChildren } from 'react'
import { FinanceStoreProvider } from '../store/FinanceStoreProvider'
import { AuthProvider } from '../../features/auth/AuthProvider'
import { useAuth } from '../../features/auth/useAuth'

export function AppProviders({ children }: PropsWithChildren) {
  return <AuthProvider><UserFinanceStore>{children}</UserFinanceStore></AuthProvider>
}

function UserFinanceStore({ children }: PropsWithChildren) {
  const { user } = useAuth()
  return <FinanceStoreProvider key={user?.id ?? 'anonymous'}>{children}</FinanceStoreProvider>
}
