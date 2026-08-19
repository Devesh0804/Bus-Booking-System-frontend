import { Navigate, Route, Routes } from 'react-router-dom'
import OperatorDashboardShell from './features/operator-dashboard/components/OperatorDashboardShell'
import PassengerDashboardShell from './features/passenger-dashboard/components/PassengerDashboardShell'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/passenger" replace />} />
      <Route path="/passenger/*" element={<PassengerDashboardShell />} />
      <Route path="/operator/*" element={<OperatorDashboardShell />} />
    </Routes>
  )
}

export default App
