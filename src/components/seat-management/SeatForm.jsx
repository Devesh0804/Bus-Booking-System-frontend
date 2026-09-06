import { useState } from 'react'

const emptySeat = { seatNumber: '', seatType: '', row: '', column: '', price: '', status: 'Available', deck: '' }

function isSleeperBus(busType) {
  return String(busType || '').toLowerCase().includes('sleeper')
}

function createDraft(seat) {
  return {
    ...seat,
    row: String(seat.row),
    column: String(seat.column),
    price: String(seat.price),
  }
}

function SeatForm({ seat, seats, busType, onSave, onCancel }) {
  const [draft, setDraft] = useState(() => createDraft(seat || emptySeat))
  const [error, setError] = useState('')

  function updateField(event) {
    setDraft((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  function saveSeat(event) {
    event.preventDefault()

    const duplicate = seats.some((item) => item.id !== seat.id && item.seatNumber.toLowerCase() === draft.seatNumber.trim().toLowerCase())
    if (!draft.seatNumber.trim()) {
      setError('Seat number cannot be empty.')
      return
    }
    if (duplicate) {
      setError('Seat number must be unique.')
      return
    }
    if (!draft.seatType || Number(draft.row) <= 0 || Number(draft.column) < 1 || Number(draft.column) > 3) {
      setError('Seat type and row must be valid, and column must be 1, 2, or 3.')
      return
    }
    if (draft.price === '' || Number(draft.price) < 0) {
      setError('Price cannot be negative.')
      return
    }

    onSave({
      ...seat,
      seatNumber: draft.seatNumber.trim(),
      seatType: draft.seatType,
      row: Number(draft.row),
      column: Number(draft.column),
      price: Number(draft.price),
      status: draft.status,
      ...(isSleeperBus(busType) ? { deck: draft.deck } : {}),
    })
  }

  return (
    <form className="operator-seat-edit-panel" onSubmit={saveSeat}>
      <div className="operator-seat-edit-heading">
        <div>
          <p className="operator-eyebrow">Selected Seat</p>
          <h2>Edit {seat.seatNumber}</h2>
        </div>
        <span>{seat.status}</span>
      </div>
      <div className="operator-seat-edit-fields">
        <label>
          Seat Number
          <input name="seatNumber" value={draft.seatNumber} onChange={updateField} />
        </label>
        <label>
          Seat Type
          <select name="seatType" value={draft.seatType} onChange={updateField}>
            <option value="">Select type</option>
            <option value="Window">Window</option>
            <option value="Aisle">Aisle</option>
            <option value="Middle">Middle</option>
          </select>
        </label>
        <label>
          Row
          <input name="row" type="number" min="1" value={draft.row} onChange={updateField} />
        </label>
        <label>
          Column
          <input name="column" type="number" min="1" value={draft.column} onChange={updateField} />
        </label>
        <label>
          Price
          <input name="price" type="number" min="0" value={draft.price} onChange={updateField} />
        </label>
        <label>
          Status
          <select name="status" value={draft.status} onChange={updateField}>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Locked">Locked</option>
          </select>
        </label>
        {isSleeperBus(busType) && (
          <label>
            Deck
            <select name="deck" value={draft.deck} onChange={updateField}>
              <option value="Upper">Upper</option>
              <option value="Lower">Lower</option>
            </select>
          </label>
        )}
      </div>
      {error && <div className="operator-form-error">{error}</div>}
      <div className="operator-form-actions">
        <button className="operator-secondary-button" type="button" onClick={onCancel}>Cancel</button>
        <button className="operator-primary-button" type="submit">Save Changes</button>
      </div>
    </form>
  )
}

export default SeatForm