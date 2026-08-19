import { Link, useParams } from 'react-router-dom'
import { mockBuses } from '../../data/busData'

const seats = [
  ['A1', 'available'], ['A2', 'booked'], ['B1', 'available'], ['B2', 'available'],
  ['C1', 'locked'], ['C2', 'available'], ['D1', 'booked'], ['D2', 'available'],
]

function SeatManagement() {
  const { busId } = useParams()
  const bus = mockBuses.find((item) => item.id === busId) || mockBuses[0]

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Seat Management</p>
          <h1>{bus.busNumber}</h1>
        </div>
        <Link className="operator-secondary-button" to="/operator/buses">Back to Buses</Link>
      </div>
      <article className="operator-page-card">
        <div className="operator-seat-front">FRONT</div>
        <div className="operator-seat-grid">
          {seats.map(([seat, status]) => (
            <button className={`operator-seat ${status}`} key={seat} type="button">
              <strong>{seat}</strong>
              <span>{status}</span>
            </button>
          ))}
        </div>
        <div className="operator-legend">
          <span>Available</span>
          <span>Booked</span>
          <span>Locked</span>
        </div>
      </article>
    </section>
  )
}

export default SeatManagement
