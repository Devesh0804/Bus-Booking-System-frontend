import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BusSeatLayout from '../../components/seat-management/BusSeatLayout'
import SeatForm from '../../components/seat-management/SeatForm'
import BaseApiCaller from '../../utils/BaseApiCaller.js'

const api = BaseApiCaller()

function normalizeSeat(seat) {
  return {
    ...seat,
    id: seat._id,
    busID: seat.busID || seat.busId,
    column: seat.column ?? seat.columns,
  }
}

function SeatManagement() {
  const { busId } = useParams()
  const [bus, setBus] = useState(null)
  const [seats, setSeats] = useState([])
  const [selectedSeatId, setSelectedSeatId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadSeatManagement() {
      if (!busId) return

      setLoading(true)
      setError('')
      try {
        const url = api.getURL(api.MODULE.BUS_OPERATION, `${busId}/seats`)
        const response = await fetch(url)
        const data = await response.json()

        if (!response.ok) throw new Error(data.message || 'Failed to load bus seats.')

        setBus(data.bus)
        setSeats((data.seats || []).map(normalizeSeat))
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setLoading(false)
      }
    }

    loadSeatManagement()
  }, [busId])

  const selectedSeat = seats.find((seat) => seat.id === selectedSeatId)

  async function updateSeat(updatedSeat) {
    try {
      const response = await fetch(api.getURL(api.MODULE.BUS_OPERATION, 'seats', updatedSeat.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSeat),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Unable to update seat.')

      const savedSeat = normalizeSeat(data.seat)
      setSeats((current) => current.map((seat) => (seat.id === savedSeat.id ? savedSeat : seat)))
      setSelectedSeatId(null)
    } catch (saveError) {
      setError(saveError.message)
    }
  }

  if (loading) return <div>Loading bus seats...</div>
  if (error || !bus) return <div className="operator-form-error">{error || 'Bus not found.'}</div>

  return (
    <section className="operator-page-stack">
      <div className="operator-page-header">
        <div>
          <p className="operator-eyebrow">Seat Management</p>
          <h1>{bus.BusNumber}</h1>
        </div>
        <Link className="operator-secondary-button" to="/operator/buses">Back to Buses</Link>
      </div>
      <section className="operator-bus-info" aria-label="Bus information">
        <span>Bus Type<strong>{bus.BusType}</strong></span>
        <span>Total Seats<strong>{seats.length}</strong></span>
        <span>Layout<strong>{bus.seatLayout}</strong></span>
        <span>Bus ID<strong>{busId}</strong></span>
      </section>
      <div className="operator-seat-workspace">
        <div>
          <BusSeatLayout
            seats={seats}
            busType={bus.BusType}
            selectedSeatId={selectedSeatId}
            onSelect={(seat) => setSelectedSeatId(seat.id)}
          />
        </div>
        {selectedSeat ? (
          <SeatForm
            key={selectedSeat.id}
            seat={selectedSeat}
            seats={seats}
            busType={bus.BusType}
            onSave={updateSeat}
            onCancel={() => setSelectedSeatId(null)}
          />
        ) : (
          <aside className="operator-seat-empty-panel">
            <p className="operator-eyebrow">Seat Editor</p>
            <h2>Select a seat to edit</h2>
            <p>Choose any seat in the layout to review or update its details.</p>
          </aside>
        )}
      </div>
    </section>
  )
}

export default SeatManagement
