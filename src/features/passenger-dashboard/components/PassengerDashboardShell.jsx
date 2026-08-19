import { useState } from 'react'
import { Link } from 'react-router-dom'
import BusResultsDashboard from '../../../components/bus-results/BusResultsDashboard'
import SearchSection from '../../../components/search/SearchSection'

const navigationItems = [
  { label: 'Search buses', path: '/passenger/search' },
  { label: 'My bookings', path: '/passenger/bookings' },
  { label: 'Saved routes', path: '/passenger/saved-routes' },
  { label: 'Support', path: '/passenger/support' },
]

function PassengerDashboardShell() {
  const [searchDetails, setSearchDetails] = useState(null)

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <Link to="/passenger" className="text-xl font-bold tracking-tight text-rose-600">
              Busly
            </Link>
            <p className="mt-1 text-sm text-slate-500">
              Passenger dashboard
            </p>
          </div>

          <nav aria-label="Passenger navigation">
            <ul className="flex flex-wrap gap-2">
              {navigationItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="inline-flex rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/operator/register"
              className="rounded-full border border-teal-600 px-4 py-2 text-sm font-semibold text-teal-700 transition hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Register Your Travels
            </Link>
            <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-rose-500">
              Sign in
            </button>
            <button className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
              Book a trip
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-rose-600">
            Passenger Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Find, book, and manage bus journeys in one place.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
            Start by searching routes, comparing buses, and keeping your bookings easy to review.
          </p>
        </div>
      </section>

      <SearchSection onSearch={setSearchDetails} />
      {searchDetails && <BusResultsDashboard searchDetails={searchDetails} />}
    </main>
  )
}

export default PassengerDashboardShell
