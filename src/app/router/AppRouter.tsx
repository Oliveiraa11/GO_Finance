import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { DashboardPage } from '../../pages/Dashboard/DashboardPage'
import { LoginPage } from '../../pages/Login/LoginPage'
import { InsightsPage } from '../../pages/Insights/InsightsPage'
import { PlaceholderPage } from '../../pages/Placeholder/PlaceholderPage'
import { TransactionsPage } from '../../pages/Transactions/TransactionsPage'
import { BudgetsPage } from '../../pages/Budgets/BudgetsPage'

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/transacoes', element: <TransactionsPage /> },
      { path: '/orcamentos', element: <BudgetsPage /> },
      { path: '/insights', element: <InsightsPage /> },
      { path: '/configuracoes', element: <PlaceholderPage title="Configurações" eyebrow="SISTEMA • GOVERNANÇA" /> },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
