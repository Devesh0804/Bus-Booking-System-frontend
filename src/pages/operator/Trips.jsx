import { useState } from 'react'
import { Link } from 'react-router-dom'
import { mockBuses } from '../../data/busData'
import { mockRoutes } from '../../data/routeData'
import { mockTrips } from '../../data/tripData'

function Trips() {
  const [trips, setTrips] = useState(mockTrips)
  const [form, setForm] = useState({ busId: '', routeId: '', date: '', departure: '', arrival: '', price: '' })
  const [filter, setFilter] = useState('All')
  const [error, setError] = useState('')

  const visibleTrips = filter === 'All' ? trips : trips.filter((trip) => trip.status === filter)

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  function submitTrip(event) {
    event.preventDefault()
    if (!form.busId || !form.routeId || !form.date || !form.departure || Number(form.price) <= 0) {
      setError('Bus, route, date, departure, and valid price are required.')
      return
    }

    const bus = mockBuses.find((item) => item.id === form.busId)
    const route = mockRoutes.find((item) => item.id === form.routeId)
    setTrips((current) => [
      {
        id: `trip-${Date.now()}`,
        routeId: route.id,
        busId: bus.id,
        route: `${route.source} to ${route.destination}`,
        busNumber: bus.busNumber,
        date: form.date,
        departure: form.departure,
        arrival: form.arrival,
        price: Number(form.price),
        bookedSeats: 0,
        totalSeats: bus.totalSeats,
        status: 'Booking Open',
      },
      ...current,
    ])
    setForm({ busId: '', routeId: '', date: '', departure: '', arrival: '', price: '' })
    setError('')
  }

  function cancelTrip(tripId) {
    setTrips((current) =>
      current.map((trip) => (trip.id === tripId ? { ...trip, status: 'Cancelled' } : trip)),
    )
  }

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Trips</p>
          <h1>Trip Management</h1>
        </div>
        <select value={filter} onChange={(event) => setFilter(event.target.value)}>
          <option>All</option>
          <option>Booking Open</option>
          <option>Cancelled</option>
        </select>
      </div>

      <form className="operator-manage-form" onSubmit={submitTrip}>
        <h2>Create Trip</h2>
        <select name="busId" value={form.busId} onChange={updateField}>
          <option value="">Select Bus</option>
          {mockBuses.map((bus) => <option key={bus.id} value={bus.id}>{bus.busNumber}</option>)}
        </select>
        <select name="routeId" value={form.routeId} onChange={updateField}>
          <option value="">Select Route</option>
          {mockRoutes.map((route) => <option key={route.id} value={route.id}>{route.source} to {route.destination}</option>)}
        </select>
        <input name="date" type="date" value={form.date} onChange={updateField} />
        <input name="departure" type="time" value={form.departure} onChange={updateField} />
        <input name="arrival" type="time" value={form.arrival} onChange={updateField} />
        <input name="price" type="number" placeholder="Ticket Price" value={form.price} onChange={updateField} />
        {error && <div className="operator-form-error">{error}</div>}
        <button className="operator-primary-button" type="submit">Create Trip</button>
      </form>

      <div className="operator-card-grid">
        {visibleTrips.map((trip) => (
          <article className="operator-item-card" key={trip.id}>
            <h2>{trip.route}</h2>
            <p>Bus: {trip.busNumber}</p>
            <p>{trip.date} | {trip.departure} to {trip.arrival}</p>
            <strong>Rs {trip.price}</strong>
            <small>{trip.bookedSeats} / {trip.totalSeats} seats booked | {trip.status}</small>
            <div className="operator-card-actions">
              <Link className="operator-secondary-button" to={`/operator/trips/${trip.id}`}>View</Link>
              <button className="operator-secondary-button" type="button">Edit</button>
              <button className="operator-secondary-button danger" type="button" onClick={() => cancelTrip(trip.id)}>Cancel</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Trips
