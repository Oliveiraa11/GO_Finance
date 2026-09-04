import type { PropsWithChildren } from 'react'
import { FinanceStoreProvider } from '../store/FinanceStoreProvider'

export function AppProviders({ children }: PropsWithChildren) {
  return <FinanceStoreProvider>{children}</FinanceStoreProvider>
}
