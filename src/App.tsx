import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

// Layout
import DashboardLayout from './components/layouts/DashboardLayout'

// Pages
const Dashboard = lazy(() => import('./pages/Dashboard'))
const DigitalPaymentsIntegration = lazy(() => import('./pages/DigitalPaymentsIntegration'))
const LMSDowntimeResiliency = lazy(() => import('./pages/LMSDowntimeResiliency'))
const TransactionQueueManager = lazy(() => import('./pages/TransactionQueueManager'))
const MultiFactorAuth = lazy(() => import('./pages/MultiFactorAuth'))
const Login = lazy(() => import('./pages/Login'))
const MandateManagement = lazy(() => import('./pages/MandateManagement'))
const Reports = lazy(() => import('./pages/Reports'))

// Loading component
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
  </div>
)

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/mfa" element={<MultiFactorAuth />} />
        
        {/* Dashboard routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="digital-payments" element={<DigitalPaymentsIntegration />} />
          <Route path="lms-downtime" element={<LMSDowntimeResiliency />} />
          <Route path="transaction-queue" element={<TransactionQueueManager />} />
          <Route path="mandates" element={<MandateManagement />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App