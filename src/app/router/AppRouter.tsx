import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../../components/layout/AppShell'
import { DashboardPage } from '../../pages/Dashboard/DashboardPage'
import { LoginPage } from '../../pages/Login/LoginPage'
import { InsightsPage } from '../../pages/Insights/InsightsPage'
import { TransactionsPage } from '../../pages/Transactions/TransactionsPage'
import { BudgetsPage } from '../../pages/Budgets/BudgetsPage'
import { SettingsPage } from '../../pages/Settings/SettingsPage'
import { PrivateRoute, PublicOnlyRoute } from '../../features/auth/AuthRoutes'

const router = createBrowserRouter([
  { path: '/login', element: <PublicOnlyRoute><LoginPage /></PublicOnlyRoute> },
  {
    element: <PrivateRoute><AppShell /></PrivateRoute>,
    children: [
      { path: '/', element: <Navigate to="/dashboard" replace /> },
      { path: '/dashboard', element: <DashboardPage /> },
      { path: '/transacoes', element: <TransactionsPage /> },
      { path: '/orcamentos', element: <BudgetsPage /> },
      { path: '/insights', element: <InsightsPage /> },
      { path: '/configuracoes', element: <SettingsPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
