import { Link, Outlet, useLocation } from 'react-router-dom'
import { getMockOperator } from '../services/operatorMockService'
import '../features/operator-dashboard/styles/operator-dashboard.css'

const navItems = [
  { label: 'Dashboard', path: '/operator/dashboard' },
  { label: 'Buses', path: '/operator/buses' },
  { label: 'Routes', path: '/operator/routes' },
  { label: 'Trips', path: '/operator/trips' },
  { label: 'Bookings', path: '/operator/bookings' },
  { label: 'Reviews', path: '/operator/reviews' },
  { label: 'Profile', path: '/operator/profile' },
  { label: 'Settings', path: '/operator/settings' },
]

function OperatorLayout() {
  const operator = getMockOperator()
  const location = useLocation()

  return (
    <div className="operator-layout">
      <header className="operator-layout-topbar">
        <Link to="/operator/dashboard" className="operator-logo">Busly Operator</Link>
        <div className="operator-topbar-meta">
          <span aria-label="Notifications" role="img">!</span>
          <strong>{operator.businessName}</strong>
        </div>
      </header>

      <div className="operator-layout-body">
        <aside className="operator-layout-sidebar" aria-label="Operator dashboard navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)

            return (
              <Link
                className={isActive ? 'active' : ''}
                key={item.label}
                to={item.path}
              >
                {item.label}
              </Link>
            )
          })}
          <Link to="/operator/login">Logout</Link>
        </aside>

        <main className="operator-layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default OperatorLayout
