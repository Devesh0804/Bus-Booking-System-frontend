import { Navigate, Route, Routes } from 'react-router-dom'
import OperatorLayout from '../../../layouts/OperatorLayout'
import BookingDetails from '../../../pages/operator/BookingDetails'
import Bookings from '../../../pages/operator/Bookings'
import Buses from '../../../pages/operator/Buses'
import OperatorDashboardHome from '../../../pages/operator/OperatorDashboardHome'
import OperatorLogin from '../../../pages/operator/OperatorLogin'
import OperatorOnboarding from '../../../pages/operator/OperatorOnboarding'
import OperatorPending from '../../../pages/operator/OperatorPending'
import OperatorRegister from '../../../pages/operator/OperatorRegister'
import Profile from '../../../pages/operator/Profile'
import Reviews from '../../../pages/operator/Reviews'
import RoutesPage from '../../../pages/operator/RoutesPage'
import RouteEditPage from '../../../pages/operator/RouteEditPage'
import SeatManagement from '../../../pages/operator/SeatManagement'
import Settings from '../../../pages/operator/Settings'
import TripDetails from '../../../pages/operator/TripDetails'
import Trips from '../../../pages/operator/Trips'

function OperatorDashboardShell() {
  return (
    <Routes>
      <Route index element={<Navigate to="register" replace />} />
      <Route path="register" element={<OperatorRegister />} />
      <Route path="onboarding" element={<OperatorOnboarding />} />
      <Route path="pending" element={<OperatorPending />} />
      <Route path="login" element={<OperatorLogin />} />

      <Route element={<OperatorLayout />}>
        <Route path="dashboard" element={<OperatorDashboardHome />} />
        <Route path="buses" element={<Buses />} />
        <Route path="routes" element={<RoutesPage />} />
        <Route path="routes/:routeId/edit" element={<RouteEditPage />} />
        <Route path="trips" element={<Trips />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="buses/:busId/seats" element={<SeatManagement />} />
        <Route path="trips/:tripId" element={<TripDetails />} />
        <Route path="bookings/:bookingId" element={<BookingDetails />} />
      </Route>
    </Routes>
  )
}

export default OperatorDashboardShell
