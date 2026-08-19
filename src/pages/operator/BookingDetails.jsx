import { Link, useParams } from 'react-router-dom'
import { mockBookings } from '../../data/bookingData'

function BookingDetails() {
  const { bookingId } = useParams()
  const booking = mockBookings.find((item) => item.id === bookingId) || mockBookings[0]

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Booking Details</p>
          <h1>{booking.id}</h1>
        </div>
        <Link className="operator-secondary-button" to="/operator/bookings">Back to Bookings</Link>
      </div>
      <article className="operator-page-card">
        <div className="operator-detail-grid">
          <span>Passenger<strong>{booking.passenger}</strong></span>
          <span>Trip<strong>{booking.trip}</strong></span>
          <span>Date<strong>{booking.date}</strong></span>
          <span>Seat<strong>{booking.seat}</strong></span>
          <span>Amount<strong>Rs {booking.amount}</strong></span>
          <span>Payment<strong>{booking.payment}</strong></span>
          <span>Status<strong>{booking.status}</strong></span>
        </div>
      </article>
    </section>
  )
}

export default BookingDetails
