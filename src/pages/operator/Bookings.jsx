import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { mockBookings } from '../../data/bookingData'

function Bookings() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('All')

  const bookings = useMemo(() => {
    return mockBookings.filter((booking) => {
      const matchesSearch = `${booking.id} ${booking.passenger} ${booking.trip}`.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = status === 'All' || booking.status === status
      return matchesSearch && matchesStatus
    })
  }, [search, status])

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Bookings</p>
          <h1>Booking Management</h1>
        </div>
      </div>
      <div className="operator-toolbar">
        <input placeholder="Search Booking" value={search} onChange={(event) => setSearch(event.target.value)} />
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option>All</option>
          <option>Confirmed</option>
          <option>Pending</option>
        </select>
      </div>
      <div className="operator-table-wrap">
        <table className="operator-data-table">
          <thead><tr><th>Booking ID</th><th>Passenger</th><th>Trip</th><th>Seat</th><th>Amount</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.passenger}</td>
                <td>{booking.trip}</td>
                <td>{booking.seat}</td>
                <td>Rs {booking.amount}</td>
                <td>{booking.status}</td>
                <td><Link className="operator-secondary-button" to={`/operator/bookings/${booking.id}`}>View</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Bookings
