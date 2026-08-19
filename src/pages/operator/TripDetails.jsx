import { Link, useParams } from 'react-router-dom'
import { mockTrips } from '../../data/tripData'

const previewSeats = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']

function TripDetails() {
  const { tripId } = useParams()
  const trip = mockTrips.find((item) => item.id === tripId) || mockTrips[0]

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Trip Details</p>
          <h1>{trip.route}</h1>
        </div>
        <Link className="operator-secondary-button" to="/operator/trips">Back to Trips</Link>
      </div>
      <article className="operator-page-card">
        <div className="operator-detail-grid">
          <span>Bus<strong>{trip.busNumber}</strong></span>
          <span>Date<strong>{trip.date}</strong></span>
          <span>Departure<strong>{trip.departure}</strong></span>
          <span>Arrival<strong>{trip.arrival}</strong></span>
          <span>Price<strong>Rs {trip.price}</strong></span>
          <span>Seats<strong>{trip.bookedSeats} / {trip.totalSeats}</strong></span>
          <span>Status<strong>{trip.status}</strong></span>
        </div>
      </article>
      <article className="operator-page-card">
        <h2>Seat Preview</h2>
        <div className="operator-seat-grid">
          {previewSeats.map((seat, index) => (
            <button className={`operator-seat ${index % 3 === 0 ? 'booked' : 'available'}`} key={seat} type="button">
              <strong>{seat}</strong>
              <span>{index % 3 === 0 ? 'booked' : 'available'}</span>
            </button>
          ))}
        </div>
      </article>
    </section>
  )
}

export default TripDetails
